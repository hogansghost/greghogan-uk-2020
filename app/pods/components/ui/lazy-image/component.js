import Component from '@ember/component';
import EmberObject, { get, observer, set } from '@ember/object';
import { equal } from '@ember/object/computed';

import Onscreen from 'greghogan-uk-2020/mixins/onscreen';

export default Component.extend(Onscreen, {
  classNames: 'lazy-image',
  hasLoaded: false,
  hasPlaceholder: false,

  srcSet: EmberObject.create({}),
  offsetSrcSet: EmberObject.create({}),

  didInsertElement() {
    // debugger;
  },

  shouldSetSrc: observer('isOnscreen', function(sender, key, value, rev) {
    if (get(this, 'isOnscreen')) {
      set(this, 'offsetSrcSet', get(this, 'srcSet'));
    }
  }),

  actions: {
    setHasLoadedState() {
      set(this, 'hasLoaded', true);
    },
  },
});
