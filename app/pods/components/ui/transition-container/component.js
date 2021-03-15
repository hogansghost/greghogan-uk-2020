import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TransitionContainer extends Component {
  @service pageTransition;

  get isTransitioning() {
    return this.pageTransition.transitioning;
  }

  @action
  setDuration(element) {
    element.style.transitionDuration = `${this.pageTransition.duration}ms`;
  }
}
