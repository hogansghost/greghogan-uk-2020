import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { not } from '@ember/object/computed';

export default Controller.extend({
  cookies: service(),

  shouldShowCookieBar: not('cookies.hasAcceptedAllCookies'),

  projectList: computed('model.project.[]', function() {
    const projects = get(this, 'model.project');

    return (projects && projects.toArray() || []).reverse();
  }),

  init() {
    this._super(...arguments);

    this.setCookieAcceptanceState();
  },

  setCookieAcceptanceState() {
    this.set('cookies.hasAcceptedAllCookies', this.cookies.checkIfCookiesAccepted());
  },

  actions: {
    sendGoogleEvent(message) {
      console.log(message);
    }
  }
});