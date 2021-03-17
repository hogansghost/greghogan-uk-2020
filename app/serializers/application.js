import RestSerializer from '@ember-data/serializer/rest';

export default class ApplicationSerializer extends RestSerializer {
  normalizeResponse(/* store, primaryModelClass, payload, id, request */) {
    return super.normalizeResponse(...arguments);
  }
}
