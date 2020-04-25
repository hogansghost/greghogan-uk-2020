import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  tagName: '',

  example: null,
  randomisedBackgroundSrcSet: '',
  randomisedBackgroundSizes: '',

  init() {
    this._super();

    this.setRandomisedBackgroundSrcSet();
  },

  setRandomisedBackgroundSrcSet() {
    const backgroundList = [
      {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_1_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_1_xs.jpg',
            width: '',
          },
          sm: {
            src: '/assets/images/external/example_1_sm.jpg',
            width: '',
          },
          md: {
            src: '/assets/images/external/example_1_md.jpg',
            width: '',
          },
          lg: {
            src: '/assets/images/external/example_1_lg.jpg',
            width: '',
          },
          xl: {
            src: '/assets/images/external/example_1_xl.jpg',
            width: '1660w',
          },
        },
        sizes: "",
      },

      // 1-7
    ];

    const randomBackgroundObject = backgroundList[Math.floor(Math.random() * ((backgroundList.length - 1) - 0)) + 0];

    set(this, 'randomisedBackgroundSrcSet', randomBackgroundObject.srcSet);
    set(this, 'randomisedBackgroundSizes', `${randomBackgroundObject.sizes}, 100w`.replace(/^, /g, ''));
  },
});
