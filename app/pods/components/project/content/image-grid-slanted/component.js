import Component from '@glimmer/component';

import { validateProp } from 'greghogan-uk-2020/utils/props';

const DefaultLimit = 12;

const AspectRatios = {
  R1_1: '1:1',
  R3_2: '3:2',
  R16_9: '16:9',
  CUSTOM: 'custom',
  SCREENSHOT: 'screenshot',
};

export default class ProjectContentImageGridSlanted extends Component {
  get limit() {
    return this.args.limitCount || DefaultLimit;
  }

  get imageAspectRatio() {
    return validateProp(this.args.imageAspect, AspectRatios, AspectRatios.R16_9);
  }

  get mediaRow() {
    const media = this.limitedMedia;

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

  get limitedMedia() {
    const limit = this.limit;
    const media = this.args.media || [];

    if (media.length > limit) {
      console.warn(`W A R N :: You have passed too many images (${media.length})to the slanted grid and the media has been limited to ${this.limit}.`); // eslint-disable-line no-console
    }

    return media.slice(0, limit);
  }
}
