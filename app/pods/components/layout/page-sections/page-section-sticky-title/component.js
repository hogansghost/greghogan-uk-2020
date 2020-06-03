import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { equal } from '@ember/object/computed';
import { throttle } from '@ember/runloop';

export default Component.extend({
  tagName: 'section',
  classNames: ['page-section-sticky-title'],

  analyticsLogName: null,
  isCurrentlyVisible: false,
  isFirstEntry: false,
  isSticky: false,
  stateFixed: false,
  stateEnd: false,
  title: '',
  onEntryToViewport: () => {},
  titlePosition: 'right',
  titleTheme: 'primary',
  hasEnteredView: false,
  isTitleFirst: equal('titlePosition', 'left'),

  bemTitleTheme: computed('titleTheme', function() {
    const titleTheme = get(this, 'titleTheme');

    return `theme-${titleTheme}`;
  }),
  
  didInsertElement() {
    this._super(...arguments);

    this.attachListeners();
    this.resetPosition();
    this.repositionStaticElement();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.detachListeners();
    this.resetPosition();
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
    throttle(this, this.repositionStaticElement, 1);
  },

  repositionStaticElement() {
    const containerElement = this.element;
    const staticElement = containerElement && containerElement.querySelector('.js__page-section-sticky-title__heading');

    const isCurrentlyVisible = get(this, 'isCurrentlyVisible');

    /**
     * Check for the static element and whether the CSS is setting it to static,
     * as anything other than static means it is meant to scroll with the client. While
     * this could check the window width, it's much easier to sync to the CSS as the media
     * width may change.
     */
    if (isCurrentlyVisible && staticElement && window.getComputedStyle(staticElement, null).getPropertyValue('position') !== 'relative' ) {
      const windowInnerHeight = window.innerHeight;
      const containerElementPosition = containerElement.getBoundingClientRect();
      const containerElementPositionTop = containerElementPosition.top;
      const containerElementPositionBottom = containerElementPosition.bottom;

      set(this, 'isSticky', true);

      if (containerElementPositionTop <= windowInnerHeight) {
        this.setFirstEntryAndCallEntryMethod();
      }

      if (containerElementPositionTop <= windowInnerHeight && containerElementPositionBottom >= 0 ) {
        if (containerElementPositionTop > 0 ) {
          set(this, 'stateFixed', false);
          set(this, 'stateEnd', false);
          set(this, 'hasEnteredView', false);
        } else if (containerElementPositionTop <= 0 && containerElementPositionBottom - windowInnerHeight > 0 ) {
          set(this, 'stateFixed', true);
          set(this, 'stateEnd', false);
          set(this, 'hasEnteredView', true);
        } else if (containerElementPositionBottom - windowInnerHeight <= 0 && containerElementPositionTop <= 0 ) {
          set(this, 'stateFixed', false);
          set(this, 'stateEnd', true);
          set(this, 'hasEnteredView', false);
        } else {
          set(this, 'stateEnd', false);
        }
      }
    } else {
      this.resetPosition();
    }
  },
  
  setFirstEntryAndCallEntryMethod() {
    if (!get(this, 'isFirstEntry') && !get(this, 'stateEnd') && get(this, 'hasEnteredView')) {
      set(this, 'isFirstEntry', true);
  
      this.onEntryToViewport();
    }
  },

  resetPosition() {
    set(this, 'isSticky', false);
    set(this, 'stateFixed', false);
    set(this, 'stateEnd', false);
  },
});
