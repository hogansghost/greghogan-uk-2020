import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: 'section',
  classNames: 'image-grid-slanted',

  media: null,
  limitCount: 12,
  imageAspect: '',

  imageAspectRatio: computed('imageAspect', function() {
    return get(this, 'imageAspect') || '16-9';
  }),

  mediaRowList: computed('media.[]', function() {
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
  }),

  limitMedia() {
    const limit = get(this, 'limitCount');
    const media = get(this, 'media') || [];

    if (limit > media.length) {
      console.warn('W A R N :: You have passed too many images to the slanted grid and the media has been limited.'); // eslint-disable-line no-console
    }

    return media.slice(0, limit);
  }
});
