import Component from '@glimmer/component';

import { validateProp } from 'greghogan-uk-2020/utils/props';

const AspectRatios = {
  R1_1: '1:1',
  R3_2: '3:2',
  R16_9: '16:9',
  CUSTOM: 'custom',
  SCREENSHOT: 'screenshot',
};

export default class ProjectContentImageGridSlanted extends Component {
  get imageAspectRatio() {
    return validateProp(this.args.imageAspect, AspectRatios, AspectRatios.R16_9);
  }

  get mediaRowList() {
    const media = this.limitMedia;

    let mediaRows = [];
    let rowCount = 0;

    while(media.length) {
      if (rowCount%2 === 0) {
        mediaRows.push(media.splice(0, 2));
      } else {
        mediaRows.push(media.splice(0, 3));
      }

      rowCount++;
    }

    return mediaRows;
  }

  get limitMedia() {
    const limit = this.args.limitCount || 12;
    const media = this.args.media || [];

    if (media.length > limit) {
      console.warn('W A R N :: You have passed too many images to the slanted grid and the media has been limited.'); // eslint-disable-line no-console
    }

    return media.slice(0, limit);
  }
}
