import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UiVideo extends Component {
  @tracked videoPosterSrcSet = null;
  @tracked videoSrcSet = null;

  get videoSrcSetList() {
    const videoSrcSet = Object.entries(this.videoSrcSet);

    let sourceList = [];

    videoSrcSet.forEach((src) => {
      const [
        type,
        source,
      ] = src;

      sourceList.push({
        source,
        type: `video/${type}`,
      });
    });

    return sourceList;
  }
}
