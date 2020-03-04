import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),

  actions: {
    goBack(event) {
      event.preventDefault();
      event.stopPropagation();

      this.router.transitionTo('home');
    },
  },
});
