import Ember from 'ember';

import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  scrolling: service(),

  alt: "",
  srcSet: null,

  didInsertElement() {
    this.scrolling.on('scroll', this, this.onScreenCheck)
  },

  onScreenCheck(event) {
    console.log('scrolling');
console.log(event);


    const componentElement = this.element;
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

  hasLoaded() {
    console.log('loaded');
  },

  notifiyLoadedStatus() {
    console.log('loaded');
  }
});
