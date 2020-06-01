import Component from '@ember/component';
import { get, set } from '@ember/object';
import { bind, next } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { onScreenCheck } from '../../../../functions/on-screen-check';

export default Component.extend({
  classNames: 'is-currently-visible',

  scrolling: service(),

  isCurrentlyVisible: false,
  intersectionObserver: null,

  init() {
    this._super(...arguments);

    this._onScreenCheck = bind(this, this.onScreenCheck);
  },

  didInsertElement() {
    this._super(...arguments);

    this.bindScrollEvents();
    // this.onScreenCheck();
  },

  willDestroyElement() {
    this.unbindScrollEvents();
  },

  bindScrollEvents() {
    if ('IntersectionObserver' in window) {

        let observer = new IntersectionObserver(this._onScreenCheck, {
          threshold: 0.1
        });


      set(this, 'intersectionObserver', observer);
      
      get(this, 'intersectionObserver').observe(this.element);
    } else {
        this.scrolling.on('scroll', this, this._onScreenCheck);
        this.scrolling.on('resize', this, this._onScreenCheck);
    }
  },

  unbindScrollEvents() {
    if ('IntersectionObserver' in window) {
      get(this, 'intersectionObserver').unobserve(this.element);
    } else {
      if (this.scrolling.has('resize')) {
        this.scrolling.off('resize', this, this._onScreenCheck);
      }

      if (this.scrolling.has('scroll')) {
        this.scrolling.off('scroll', this, this._onScreenCheck);
      }
    }
  },

  onScreenCheck(intersection) {
    if ('IntersectionObserver' in window) {
      if (intersection?.[0]?.isIntersecting) {
        set(this, 'isCurrentlyVisible', true);
        this.unbindScrollEvents();
      }
    } else {
      const isOnscreenCurrently = onScreenCheck(this.element);
      
      next(this, function() {
        if (isOnscreenCurrently && !get(this, 'isCurrentlyVisible') && this._state === 'inDOM') {
          set(this, 'isCurrentlyVisible', true);
          this.unbindScrollEvents();
        }
      });
    }
  },
});
