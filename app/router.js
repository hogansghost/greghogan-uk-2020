import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('not-found', { path: '/*path' });
  this.route('project', { path: 'project/:id' });
});

Router.reopen({
  cookies: service(),

  hasTransitioned: false,

  willTransition(transition) {
    this._super(...arguments);

    this.acceptCookieOnPageChange(transition);
  },

  didTransition(transition) {
    this._super(...arguments);

    this.captureFirstTransitionOntoSite();
    this.logGoogleAnalyticsOnPageChange(transition);
  },

  captureFirstTransitionOntoSite() {
    set(this, 'hasTransitioned', true);
  },

  logGoogleAnalyticsOnPageChange(transitionObj) {
    if( transitionObj && transitionObj.lastObject ) {
      // window.gtag('send', 'event', 'Page Section', `Viewed - ${stringsHumaniser(transitionObj.lastObject.name)}`);
    }
  },

  acceptCookieOnPageChange(transitionObj) {
    if (get(this, 'hasTransitioned')) {
      this.cookies.acceptAllCookies();
    }
  }
});
