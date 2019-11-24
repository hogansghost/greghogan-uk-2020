import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr(),
  name: DS.attr(),
  projectContents: DS.attr(),
  role: DS.attr(),
  thumbnail: DS.attr(),
  url: DS.attr(),
});
