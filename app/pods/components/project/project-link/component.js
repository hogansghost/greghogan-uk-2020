import Component from '@ember/component';

export default Component.extend({
  tagName: 'article',
  classNames: ['project-link'],
  classNameBindings: ['isCurrentlyVisible:project-link--visible:project-link--hidden'],
  
  id: '',
  isCurrentlyVisible: false,
  name: '',
  role: '',
  srcSet: null,
  url: '',
});
