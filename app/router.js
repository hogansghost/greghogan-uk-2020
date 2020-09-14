import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import config from './config/environment';

import { fireGoogleEvent } from './functions/googleTrackingEvents';

export default class Router extends EmberRouter {
  @service cookies;

  location = config.locationType;
  rootURL = config.rootURL;

  @tracked hasTransitioned = false;

  constructor() {
    super(...arguments);

    this.on('routeWillChange', (transition) => {
      this.acceptCookieOnPageChange(transition);
    });

    this.on('routeDidChange', (transition) => {
      this.captureFirstTransitionOntoSite();
      this.logGoogleAnalyticsOnPageChange(transition);
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
}

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('not-found', { path: '/*path' });
  this.route('project', { path: 'project/:id' });
});
