import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const aspectRatios = {
  '16:9': '16:9',
};

export default class ProjectContentImageGridSlanted extends Component {
  @tracked media = null;
  @tracked limitCount = 12;
  @tracked imageAspect = '';

  get imageAspectRatio() {
    return this.args.imageAspect || aspectRatios['16:9'];
  }

  get mediaRowList() {
    const media = this.limitMedia();

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

  limitMedia() {
    const limit = this.args.limitCount || 12;
    const media = this.args.media || [];

    if (media.length > limit) {
      console.warn('W A R N :: You have passed too many images to the slanted grid and the media has been limited.'); // eslint-disable-line no-console
    }

    return media.slice(0, limit);
  }
}
