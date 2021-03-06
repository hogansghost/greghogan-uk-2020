import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScrollPositionService extends Service {
  @tracked routePosition = {};

  @action
  storeRoutePosition(routeName) {
    if (!routeName) {
      return;
    }

    this.routePosition[routeName] = window?.pageYOffset || 0;
  }

  @action
  scrollTo(position = 0) {
    window && window.scrollTo({
      top: position,
    });
  }

  @action scrollToTop() {
    this.scrollTo(0);
  }

  @action
  scrollToPreviousScrollPosition(targetRouteName) {
    if (targetRouteName) {
      const targetPosition = this.routePosition[targetRouteName] || 0;

      this.scrollTo(targetPosition);
    } else {
      this.scrollToTop();
    }
  }
}
