import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';

export default Route.extend({
  // store: service(),
  model(params) {
    return this.store.find('project', params.post_id);
  },

  beforeModel() {
    console.log('beforeModel');
    window.scrollTo(0,0);
  }
});
