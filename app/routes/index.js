export default Ember.Route.extend({
  model: function() {
    return {
      appName: "Pocket"
    };
  },
  beforeModel: function() {
    this.transitionTo('plugins');
  }
});
