// Currently unused. 15/03/2021

import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { debounce, throttle } from '@ember/runloop';
import { getOwner } from '@ember/application';

export default Service.extend(Evented, {
  init() {
    this.handlers = [];
    this.initEvents();
    this._super();
  },

  initEvents() {
    window.addEventListener('scroll', (e) => {
      throttle(this, this.emitEvent('scroll', 'scrollThrottle'), [e], 50);
      debounce(this, this.emitEvent('scrollEnd', 'scrollEndDebounce'), [e], 50);
      debounce(this, this.emitEvent('scroll', 'scrollDebounce'), [e], 50);
    });

    window.addEventListener('resize', (e) => {
      debounce(this, this.emitEvent('resize'), [e], 50);
    });

    let service = this;

    let appRoute = getOwner(this).lookup('route:application');

    appRoute.reopen({
      actions: {
        loading() {
          this._super(...arguments);

          service.trigger('transitionStart');

          this._router.one('didTransition', () => {
            service.trigger('transitionEnd');
          });
        }
      }
    });
  },

  /*  Creates a function for the specified event,
  *   as trottle/debounce work off each unique function,
  *   passing a generic function resets other throttle/debounce triggers
  */
  emitEvent(eventName, id) {
    let handler = this.handlers[id] || function(...args) {
      this.trigger(eventName, ...args);
    }

    this.handlers[id] = handler;

    return this.handlers[id];
  },
});