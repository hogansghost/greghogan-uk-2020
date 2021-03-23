import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

export default class TransitioningService extends Service {
  @tracked transitioning = false;
  @tracked duration = 375;

  get isTransitioning() {
    return this.transitioning;
  }

  @action
  setTransitioningStart() {
    this.transitioning = true;
  }

  @action
  setTransitioningEnd() {
    later(() => {
      this.transitioning = false;
    });
  }
}
