import Component from '@glimmer/component';

export default class UiVideo extends Component {
  get videoSrcSetList() {
    const videoSrcSet = Object.entries(this.args.videoSrcSet);

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
