import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProjectRoute extends Route {
  model(params) {
    return RSVP.hash({
      author: this.store.queryRecord('author', {}),
      project: this.store.find('project', params.id),
    });
  }
}
