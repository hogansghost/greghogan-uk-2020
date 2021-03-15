import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class PostAdapter extends JSONAPIAdapter {
  host = 'https://demo.ghost.io/ghost/api/v3/content';

  buildURL(...args) {
    return `${super.buildURL(...args)}/?key=22444f78447824223cefc48062&include=tags,authors`;
  }
}
