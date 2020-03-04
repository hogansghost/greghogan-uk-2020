import Component from '@ember/component';
import EmberObject, { computed, get, set } from '@ember/object';

export default Component.extend({
  projectLink: '',
  projectRole: '',
  projectTimeframe: '',
  projectTitle: '',
  projectVideo: EmberObject.create({}),
  projectVideoPlaceholder: EmberObject.create({}),
});
