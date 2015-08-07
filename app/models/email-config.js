import DS from 'ember-data';

export default DS.Model.extend({
  templates: DS.hasMany('email-template'),
  outgoing: DS.attr()
});
