import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  projectContents: DS.attr(),
  role: DS.attr(),
  thumbnail: DS.attr(),
  timeframe: DS.attr(),
  url: DS.attr(),
});
