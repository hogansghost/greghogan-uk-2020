import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2020/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'section',
  classNames: ['mockup-grid'],
  classNameBindings: ['isOnscreen:mockup-grid--visible:mockup-grid--hidden'],

  media: null,
});
