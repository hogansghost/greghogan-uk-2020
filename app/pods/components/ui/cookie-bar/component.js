import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  cookies: service(),

  actions: {
    acceptCookie() {
      this.cookies.acceptAllCookies();
    },
  },
});
