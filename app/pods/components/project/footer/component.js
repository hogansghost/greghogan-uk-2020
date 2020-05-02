import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  author: null,

  contactLinks: computed('author.profileLinks.[]', function() {
    return get(this, 'author.profileLinks').filter((link) => link.type === 'personal');
  }),
});
