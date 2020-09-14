import Controller from '@ember/controller';
import { action } from '@ember/object';

import { fireGoogleEvent } from '../../functions/googleTrackingEvents';

export default class HomeController extends Controller {

  get projects() {
    return this.model.projects && this.model.projects.toArray() || [];
  }

  get projectList() {
    const projects = this.projects;

    return projects.sort((a, b) => a.uid - b.uid).reverse();
  }

  @action
  sendGoogleEvent(element, message) {
    fireGoogleEvent(message);
  }
}
