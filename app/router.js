import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { later, scheduleOnce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

import config from './config/environment';

import { fireGoogleEvent } from './functions/googleTrackingEvents';

export default class Router extends EmberRouter {
  @service cookies;
  @service scrollPosition;
  @service pageTransition;

  location = config.locationType;
  rootURL = config.rootURL;

  @tracked hasTransitioned = false;
  @tracked holdTransition = true;
  @tracked transitionTargetIsHome = false;

  constructor() {
    super(...arguments);

    this.on('routeWillChange', (transition) => {
      if (!transition.isAborted) {
        this.acceptCookieOnPageChange(transition);
        this.transitionRouteOut(transition);
      }
    });

    this.on('routeDidChange', (transition) => {
      if (!transition.isAborted) {
        this.captureFirstTransitionOntoSite();
        this.logGoogleAnalyticsOnPageChange(transition);

        this.transitionRouteIn(transition);
      }
    });
  }

  captureFirstTransitionOntoSite() {
    this.hasTransitioned = true;
  }

  logGoogleAnalyticsOnPageChange(transitionObj) {
    if (transitionObj?.to?.params?.id) {
      fireGoogleEvent(transitionObj.to.params.id);
    }
  }

  acceptCookieOnPageChange() {
    if (this.hasTransitioned) {
      this.cookies.acceptAllCookies();
    }
  }

  updateScrollPosition(transition) {
    const routeName = transition?.from?.name;

    if (!transition.isAborted && routeName) {
      this.scrollPosition.storeRoutePosition(routeName);
    }
  }

  transitionRouteOut(transition) {
    this.updateScrollPosition(transition);

    if (
      transition.from &&
      transition?.to?.name !== transition?.from?.name &&
      transition?.to?.name !== this.holdTransition?.to?.name
    ) {
      this.holdTransition = transition;
      this.pageTransition.setTransitioningStart();

      transition.abort();

      const transitionDelay = new Promise((resolve) => {
        later(() => {
          resolve();
        }, this.pageTransition.duration);
      })


      return transitionDelay.then(() => {
        this.holdTransition.retry().then(() => {
          const targetRouteName = this.holdTransition.to.name;
          const scrollToPreviousPosition = (transition?.router?.currentRouteInfos || []).some((routeInfo) => routeInfo?.route?.controller?.storeScrollPosition);

          if (scrollToPreviousPosition) {
            scheduleOnce('afterRender', this, () => this.scrollPosition.scrollToPreviousScrollPosition(targetRouteName));
          } else {
            this.scrollPosition.scrollToTop();
          }

          this.holdTransition = null;
        });
      });
    }
  }

  transitionRouteIn(transition) {
    if (!transition.isAborted && !transition.isActive) {
      scheduleOnce('afterRender', this, this.pageTransition.setTransitioningEnd);
    }
  }
}

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('project', { path: 'project/:id' });
  this.route('not-found');

  // This must remain the last item.
  this.route('wild-card', { path: '/*path' });
});
