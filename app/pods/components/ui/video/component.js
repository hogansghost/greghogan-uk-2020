import Component from '@ember/component';
import EmberObject, { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',

  videoPosterSrcSet: EmberObject.create({}),
  videoSrcSet: EmberObject.create({}),

  videoSrcSetList: computed('videoSrcSet.[]', function() {
    const videoSrcSet = Object.entries(get(this, 'videoSrcSet'));

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
    })

    return sourceList;
  }),
});
