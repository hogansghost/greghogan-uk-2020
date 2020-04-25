import DS from 'ember-data';

export default DS.Model.extend({
  codepen: DS.attr({
    defaultValue() {
      return [];
    }
  }),
});
