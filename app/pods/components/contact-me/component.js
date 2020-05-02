import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  description: [],
  links: [],

  contactLinks: computed('links', function() {
    return get(this, 'links').filter((link) => link.type === 'personal');
  }),
});
