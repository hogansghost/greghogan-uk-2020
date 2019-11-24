import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      author: this.store.findRecord('author', 1),
      test: this.store.findAll('test'),
      project: this.store.findAll('project'),
    });
  },
});
