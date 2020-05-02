import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  projectContents: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  role: DS.attr('string'),
  thumbnail: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  timeframe: DS.attr({
    defaultValue() {
      return {};
    }
  }),
  url: DS.attr({
    defaultValue() {
      return [];
    }
  }),
});
