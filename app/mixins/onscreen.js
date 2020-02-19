import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';
import { throttle } from '@ember/runloop';

export default Mixin.create({
  isOnscreenOnce: true,
  isOnscreenActive: true,
  isOnscreen: false,
  currentPos: 0,
  topPosition: 0,
  bottomPosition: 0,

  didInsertElement() {
    this._super(...arguments);

    this.attachListeners();
    this.onScreenCheck();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.detachListeners();
  },

  attachListeners() {
    this._onScroll = this.throttledRepositionStaticElement.bind(this);

    window.addEventListener('scroll', this._onScroll, false);
    window.addEventListener('resize', this._onScroll, false);
  },

  detachListeners() {
    window.removeEventListener('scroll', this._onScroll, false);
    window.removeEventListener('resize', this._onScroll, false);
  },

  throttledRepositionStaticElement() {
    throttle(this, this.onScreenCheck, 10);
  },

  onScreenCheck() {
    const componentElement = this.element || this.element.firstChild;
    const componentElementHeight = componentElement.offsetHeight;
    const componentElementRect = componentElement && componentElement.getBoundingClientRect();
    const componentElementRectTop = componentElementRect.top;
    const componentElementFullOffset = componentElementRectTop + componentElementHeight;

    const onlyRunOnce = get(this, 'isOnscreenOnce');
    const windowHeight  = window && window.innerHeight || 0;

    set(this, 'topPosition', componentElementRectTop);
    set(this, 'bottomPosition', componentElementFullOffset);

    const isElementOnScreen = componentElementRectTop - (windowHeight * 0.9) <= 0 && componentElementFullOffset >= 0;

    if( isElementOnScreen && onlyRunOnce ) {
      set(this, 'isOnscreen', true);

      this.detachListeners();
    } else if( isElementOnScreen ) {
      set(this, 'isOnscreen', true);
    } else {
      set(this, 'isOnscreen', false);
    }
  },
});
