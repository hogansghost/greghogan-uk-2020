import Controller from '@ember/controller';
import { action } from '@ember/object';

import { fireGoogleEvent } from '../../functions/googleTrackingEvents';

export default class HomeController extends Controller {
  get projects() {
    return this.model?.projects || [];
  }

  @action
  sendGoogleEvent(element, message) {
    fireGoogleEvent(message);
  }
}
