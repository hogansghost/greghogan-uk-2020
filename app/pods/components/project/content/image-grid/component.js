import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2020/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'section',
  classNames: ['image-grid'],
  classNameBindings: ['isOnscreen:image-grid--visible:image-grid--hidden'],

  colCount: 2,
  media: null,
});
