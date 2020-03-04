import Component from '@ember/component';
import Onscreen from 'greghogan-uk-2020/mixins/onscreen';
import EmberObject from '@ember/object';

export default Component.extend(Onscreen, {
  tagName: 'article',
  classNames: ['project-link'],
  classNameBindings: ['isOnscreen:project-link--visible:project-link--hidden'],

  name: '',
  srcSet: EmberObject.create({}),
});
