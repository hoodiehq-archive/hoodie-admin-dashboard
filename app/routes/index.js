import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
  },
  afterModel: function() {
    this.transitionTo('plugins');
  }
});
