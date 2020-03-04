import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2020/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'section',
  classNames: ['tech-grid'],
  classNameBindings: ['isOnscreen:tech-grid--visible:tech-grid--hidden'],

  technology: null,
});
