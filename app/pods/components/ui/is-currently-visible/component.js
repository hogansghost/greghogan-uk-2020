import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import EmberObject, { get, computed, observer, set } from '@ember/object';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { onScreenCheck } from '../../../../functions/on-screen-check';

export default Component.extend({
  classNames: 'is-currently-visible',

  scrolling: service(),

  isCurrentlyVisible: false,

  didInsertElement() {
    this._super();

    this.bindScrollEvents();
    this.onScreenCheck();
  },

  willDestroyElement() {
    this.unbindScrollEvents();
  },

  bindScrollEvents() {
    this.onScreenCheck();

    this.scrolling.on('scroll', this, this.onScreenCheck);
    this.scrolling.on('resize', this, this.onScreenCheck);
  },

  unbindScrollEvents() {
    if (this.scrolling.has('resize')) {
      this.scrolling.off('resize', this, this.onScreenCheck);
    }

    if (this.scrolling.has('scroll')) {
      this.scrolling.off('scroll', this, this.onScreenCheck);
    }
  },

  onScreenCheck() {
    const isOnscreenCurrently = onScreenCheck(this.element);

    next(this, function() {
      if (isOnscreenCurrently && !get(this, 'isCurrentlyVisible') && this._state === 'inDOM') {
        set(this, 'isCurrentlyVisible', true);
      }
    });
  },
});
