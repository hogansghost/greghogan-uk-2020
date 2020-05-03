import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['tech-grid-item'],
  classNameBindings: ['isCurrentlyVisible:tech-grid-item--visible:tech-grid-item--hidden'],

  isCurrentlyVisible: false,
  tech: null,
});
