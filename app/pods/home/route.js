import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class HomeRoute extends Route {
  async model() {
    return RSVP.hash({
      author: this.store.queryRecord('author', {}),
      example: this.store.queryRecord('example', {}),
      projects: this.store.findAll('project', {
        reload: true,
      }).then((projects) => {
        const projectArray = projects?.toArray() || [];

        return projectArray.sort((a, b) => (
          +a.order < +b.order ? 1 : -1
        ));
      }),
    });
  }
}
