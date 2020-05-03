import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  description: null,
  links: null,

  contactLinks: computed('links', function() {
    const links = get(this, 'links') || [];

    return links.filter((link) => link.type === 'personal');
  }),
});
