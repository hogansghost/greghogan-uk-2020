import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  subtitle: DS.attr('string'),
  description: DS.attr(),
  skills: DS.attr(),
});
