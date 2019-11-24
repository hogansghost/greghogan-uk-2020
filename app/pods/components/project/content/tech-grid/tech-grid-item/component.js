import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2019/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'section',
  classNames: ['tech-grid-item'],
  classNameBindings: ['isOnscreen:tech-grid-item--visible:tech-grid-item--hidden'],

  tech: null,
});
