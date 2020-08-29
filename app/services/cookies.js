import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import ENV from '../config/environment';

export default class CookieService extends Service {
  @tracked hasAcceptedAllCookies = false;

  get decadeAheadDate() {
    const today = new Date();

    return new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
  }

  readCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));

    return matches ? decodeURIComponent(matches[1]) : '';
  }

  writeCookie(name, value, options = {}) {
    let cookieOptions = {
      path: '/',
      samesite: 'strict',
      ...( ENV.APP.ENABLESECURECOOKIES && { secure: true }),
      ...options
    };

    if (cookieOptions.expires instanceof Date) {
      cookieOptions.expires = cookieOptions.expires.toUTCString();
    }

    let newCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    Object.entries(cookieOptions).forEach(([key, val]) => {
      const valToAppend = val !== true ? `=${val}` : '';

      newCookie += `; ${key}${valToAppend}`;
    });

    document.cookie = newCookie;
  }

  checkIfCookiesAccepted() {
    const acceptedAll = Boolean(this.readCookie('cookiesAccept'));

    this.hasAcceptedAllCookies = acceptedAll;

    return acceptedAll;
  }

  @action
  acceptAllCookies() {
    this.writeCookie('cookiesAccept', 'true', {
      expires: this.decadeAheadDate,
    });

    this.hasAcceptedAllCookies = true;
  }
}
