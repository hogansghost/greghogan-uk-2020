import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TransitioningService extends Service {
  @tracked transitioning = false;
  @tracked duration = 500;

  get isTransitioning() {
    return this.transitioning;
  }

  @action
  setTransitioningStart() {
    this.transitioning = true;
  }

  @action
  setTransitioningEnd() {
    this.transitioning = false;
  }
}
