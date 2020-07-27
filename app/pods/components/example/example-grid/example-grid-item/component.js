import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ExampleExampleGridItem extends Component {
  @tracked isCurrentlyVisible = false;
  @tracked example = null;
  @tracked randomisedBackgroundSrcSet = '';
  @tracked randomisedBackgroundSizes = '';

  constructor(owner, args) {
    super(owner, args);

    this.setRandomisedBackgroundSrcSet();
  }

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
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_1_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_1_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_1_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_1_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_2_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_2_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_2_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_2_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_2_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_2_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_3_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_3_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_3_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_3_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_3_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_3_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_4_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_4_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_4_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_4_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_4_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_4_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_5_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_5_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_5_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_5_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_5_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_5_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_6_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_6_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_6_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_6_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_6_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_6_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      }, {
        srcSet: {
          pl: {
            src: '/assets/images/external/example_7_pl.jpg',
            width: '100w',
          },
          xs: {
            src: '/assets/images/external/example_7_xs.jpg',
            width: '500w',
          },
          sm: {
            src: '/assets/images/external/example_7_sm.jpg',
            width: '700w',
          },
          md: {
            src: '/assets/images/external/example_7_md.jpg',
            width: '900w',
          },
          lg: {
            src: '/assets/images/external/example_7_lg.jpg',
            width: '1200w',
          },
          xl: {
            src: '/assets/images/external/example_7_xl.jpg',
            width: '1660w',
          },
        },
        "sizes": "(min-width: 1200px) 1660px, (min-width: 900px) 1200px, (min-width: 700px) 900px, (min-width: 500px) 700px, (min-width: 300px) 500px, 100vw"
      },
    ];

    const randomNumberListRange = Math.floor(Math.random() * ((backgroundList.length - 1) - 0)) + 0;
    const randomBackgroundObject = backgroundList[randomNumberListRange];

    this.randomisedBackgroundSrcSet = randomBackgroundObject.srcSet;
    this.randomisedBackgroundSizes = randomBackgroundObject.sizes;
  }
}
