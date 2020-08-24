import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class HomeRoute extends Route {
  model() {
    return RSVP.hash({
      author: this.store.queryRecord('author', {}),
      example: this.store.queryRecord('example', {}),
      projects: this.store.findAll('project', { reload: true }),
    });
  }
}