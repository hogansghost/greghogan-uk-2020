import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { not } from '@ember/object/computed';

export default Controller.extend({
  cookies: service(),

  shouldShowCookieBar: not('cookies.hasAcceptedAllCookies'),

  init() {
    this._super(...arguments);

    this.setScrollHandlingToManual();
    this.setCookieAcceptanceState();
  },

  setScrollHandlingToManual() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  },

  setCookieAcceptanceState() {
    set(this, 'cookies.hasAcceptedAllCookies', this.cookies.checkIfCookiesAccepted());
  },
});