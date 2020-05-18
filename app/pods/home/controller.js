import Controller from '@ember/controller';
import { computed, get } from '@ember/object';

export default Controller.extend({
  projectList: computed('model.project.[]', function() {
    const projects = get(this, 'model.project');

    return (projects && projects.toArray() || []).sortBy('uid').reverse();
  }),

  actions: {
    sendGoogleEvent(message) {
      console.log(message);
    }
  }
});