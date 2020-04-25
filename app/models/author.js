import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  role: DS.attr('string'),
  details: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  description: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  contactDescription: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  profileLinks: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  skills: DS.attr({
    defaultValue() {
      return {};
    }
  }),
});
