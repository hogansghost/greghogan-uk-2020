import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2020/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'section',
  classNames: ['mockup-grid'],
  classNameBindings: ['isCurrentlyVisible:mockup-grid--visible:mockup-grid--hidden'],

  isCurrentlyVisible: false,
  media: null,
});
