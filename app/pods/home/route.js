import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      author: this.store.queryRecord('author', {}),
      example: this.store.queryRecord('example', {}),
      project: this.store.findAll('project'),
    });
  },
});
