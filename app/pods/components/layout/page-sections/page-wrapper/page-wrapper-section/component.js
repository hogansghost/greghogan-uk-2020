import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  gutterVertical: 'md',
  hasOverlap: false,
  gutterVerticalTopOnly: false,
  gutterVerticalBottomOnly: false,

  gutterVerticalSpacer: computed('gutterVertical', function() {
    return `gutter-vertical-${get(this, 'gutterVertical')}`;
  }),
});
