import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { not } from '@ember/object/computed';

export default Controller.extend({
  cookies: service(),
  darkMode: service(),

  shouldShowCookieBar: not('cookies.hasAcceptedAllCookies'),

  init() {
    this._super(...arguments);

    this.setScrollHandlingToManual();
    this.jsEnabled();
    this.setCookieAcceptanceState();
    this.darkMode.init();
  },

  jsEnabled() {
    document?.body?.removeAttribute('data-script');
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