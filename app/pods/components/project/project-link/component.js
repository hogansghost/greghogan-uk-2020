import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2019/mixins/onscreen';

export default Component.extend(Onscreen, {
  tagName: 'article',
  classNames: ['project-link'],
  classNameBindings: ['isOnscreen:project-link--visible:project-link--hidden'],

  name: '',
  srcSet: new Object,
});
