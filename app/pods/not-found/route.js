import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class NotFoundRoute extends Route {
  async model(params, transition) {
    const {
      code,
      message,
    } = transition.to.queryParams;

    return RSVP.hash({
      code,
      message,
    });
  }
}
