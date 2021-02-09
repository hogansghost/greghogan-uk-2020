import Controller from '@ember/controller';
import { action } from '@ember/object';

import { fireGoogleEvent } from '../../functions/googleTrackingEvents';

export default class HomeController extends Controller {
  get author() {
    return this.model?.author;
  }

  get projects() {
    return this.model?.projects || [];
  }

  get heroImageSrcSet() {
    return this.projects.get('lastObject.thumbnail.srcSet');
  }

  @action
  sendGoogleEvent(message) {
    fireGoogleEvent(message);
  }
}
