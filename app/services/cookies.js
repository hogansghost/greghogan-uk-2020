import Service from '@ember/service';
import { alias } from '@ember/object/computed';

export default Service.extend({
  readCookie(cookie, callback = f => f) {
    return document.cookie.split(';').filter((item) => item.trim().startsWith(`${cookie}=`));
  },

  writeCookie(name, value = '', lifetime) {
    if ( !name ) {
      return;
    }

    let cookieToWrite = `${name}=`;
    
    cookieToWrite += value;
    cookieToWrite += lifetime ? `; expires${lifetime}` : '';

    document.cookie = `${cookieToWrite}; `;
  },

  hasAcceptedAllCookies: false,

  acceptAllCookies() {
    this.writeCookie('cookiesAccept', 'true', 'Fri, 31 Dec 9999 23:59:59 GMT');

    this.set('hasAcceptedAllCookies', true);
  },

  checkIfCookiesAccepted() {
    return Boolean(this.readCookie('cookiesAccept').length);
  },
});
