import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScrollPositionService extends Service {
  @tracked scrollY = 0;

  get scrollPosition() {
    return this.scrollY;
  }

  @action
  scrollTo(position = 0) {
    window && window.scrollTo({
      top: position,
    });
  }

  @action
  scrollToPreviousScrollPosition() {
    window && window.scrollTo({
      top: this.scrollPosition,
    });
  }

  @action
  setScrollY(position) {
    this.scrollY = position || window?.scrollY || 0;
  }
}
