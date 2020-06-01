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

    this._onScreenCheckListener = bind(this, this.onScreenCheckListener);
    this._onScreenCheckIntersection = bind(this, this.onScreenCheckIntersection);
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
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this._onScreenCheckIntersection();
          }
        });
      }, {
        threshold: 0.1
      });

      set(this, 'intersectionObserver', observer);
      
      get(this, 'intersectionObserver').observe(this.element);
    } else {
        this.scrolling.on('scroll', this, this._onScreenCheckListener);
        this.scrolling.on('resize', this, this._onScreenCheckListener);
    }
  },

  unbindScrollEvents() {
    if ('IntersectionObserver' in window) {
      // get(this, 'intersectionObserver').unobserve(this.element);
      get(this, 'intersectionObserver').observe(this.element);
    } else {
      if (this.scrolling.has('resize')) {
        this.scrolling.off('resize', this, this._onScreenCheckListener);
      }

      if (this.scrolling.has('scroll')) {
        this.scrolling.off('scroll', this, this._onScreenCheckListener);
      }
    }
  },

  onScreenCheckIntersection() {
    set(this, 'isCurrentlyVisible', true);
    this.unbindScrollEvents();
  },

  onScreenCheckListener() {
    const isOnscreenCurrently = onScreenCheck(this.element);
    
    next(this, function() {
      if (isOnscreenCurrently && !get(this, 'isCurrentlyVisible') && this._state === 'inDOM') {
        set(this, 'isCurrentlyVisible', true);
        this.unbindScrollEvents();
      }
    });
  },
});
