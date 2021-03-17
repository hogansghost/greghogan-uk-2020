import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { action } from '@ember/object';

export default class ProjectRoute extends Route {
  model(params) {
    const author = this.store.queryRecord('author', {});
    const project = this.store.findRecord('project', params.id);

    return RSVP.hash({
      author,
      project,
    });
  }

  afterModel(model) {
    if (!model.project) {
      this.error();
    }
  }

  @action
  error(err) {
    console.log(err);
    if (err.statusCode === 404) {
      this.replaceWith('not-found', { queryParams: { code: err.statusCode, message: err.message } });
    }
  }
}
