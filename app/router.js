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

  isTransitionTargetHome(transition = {}) {
    return transition?.to?.name === 'home' && transition?.to.name !== transition?.from?.name;
  }

  updateScrollPosition(transition) {
    if (!transition.isAborted && !this.isTransitionTargetHome(transition)) {
      this.scrollPosition.setScrollY();
    }
  }

  transitionRouteOut(transition) {
    this.updateScrollPosition(transition);

    if (
      transition?.from?.name &&
      transition?.to?.name !== transition?.from?.name &&
      transition?.to?.name !== this.holdTransition?.to?.name
    ) {
      this.holdTransition = transition;
      this.pageTransition.setTransitioningStart();

      transition.abort();

      const transitionDelay = new Promise((resolve) => {
        return later(() => {
          return resolve();
        }, this.pageTransition.duration);
      })

      return transitionDelay.then(() => {
        this.holdTransition.retry().then(() => {
          if (this.isTransitionTargetHome(this.holdTransition)) {
            scheduleOnce('afterRender', this, this.scrollPosition.scrollToPreviousScrollPosition);
          } else {
            this.scrollPosition.scrollTo();
          }

          this.holdTransition = null;
        });
      });
    }
  }

  transitionRouteIn(transition) {
    if (!transition.isAborted && !transition.isActive) {
      this.pageTransition.setTransitioningEnd();
    }
  }
}

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('not-found', { path: '/*path' });
  this.route('project', { path: 'project/:id' });
});
