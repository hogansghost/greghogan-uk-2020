import DS from 'ember-data';

export default DS.Model.extend({
  contactDescription: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  copyright: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  description: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  details: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  footerDescription: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  images: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  name: DS.attr('string'),
  profileLinks: DS.attr({
    defaultValue() {
      return [];
    }
  }),
  role: DS.attr('string'),
  subtitle: DS.attr('string'),
  skills: DS.attr({
    defaultValue() {
      return {};
    }
  }),
});
