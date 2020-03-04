import Component from '@ember/component';
import { get, set } from '@ember/object';
import { equal } from '@ember/object/computed';
import { throttle } from '@ember/runloop';


export default Component.extend({
  tagName: 'section',
  classNames: ['page-section-sticky-title'],

  analyticsLogName: null,
  isSticky: false,
  stateFixed: false,
  stateEnd: false,
  title: '',
  titlePosition: 'right',
  titleTheme: 'primary',
  hasEnteredView: false,
  isTitleFirst: equal('titlePosition', 'left'),

  onEntryToViewport: (f) => console.log('original'),
  
  didInsertElement() {
    this._super(...arguments);

    this.attachListeners();
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

    /**
     * Check for the static element and whether the CSS is setting it to static,
     * as anything other than static means it is meant to scroll with the client. While
     * this could check the window width, it's much easier to sync to the CSS as the media
     * width may change.
     */
    if( staticElement && window.getComputedStyle(staticElement, null).getPropertyValue('position') !== 'relative' ) {
      const windowInnerHeight = window.innerHeight;
      const containerElementPosition = containerElement.getBoundingClientRect();
      const containerElementPositionTop = containerElementPosition.top;
      const containerElementPositionBottom = containerElementPosition.bottom;

      set(this, 'isSticky', true);

      if( containerElementPositionTop <= windowInnerHeight && containerElementPositionBottom >= 0 ) {
        if( containerElementPositionTop > 0 ) {
          set(this, 'stateFixed', false);
          set(this, 'stateEnd', false);
          set(this, 'hasEnteredView', false);
        } else if( containerElementPositionTop <= 0 && containerElementPositionBottom - windowInnerHeight > 0 ) {
          this._onEntryToViewport();

          set(this, 'stateFixed', true);
          set(this, 'stateEnd', false);
          set(this, 'hasEnteredView', true);
        } else if( containerElementPositionBottom - windowInnerHeight <= 0 && containerElementPositionTop <= 0 ) {
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

  resetPosition() {
    set(this, 'isSticky', false);
    set(this, 'stateFixed', false);
    set(this, 'stateEnd', false);
  },

  _onEntryToViewport() {
    if (!this.hasEnteredView) {
      this.onEntryToViewport();
    }
  },

  

  // onEntryToViewport() {
  //   if( get(this, 'analyticsLogName') && !!window.gtag) {
  //     window.gtag('send', 'event', 'Page Section', `Viewed - ${get(this, 'analyticsLogName')}`);
  //   }
  // }
});
