export default Ember.Route.extend({
  model: function(params) {
    console.log('params: ',params);
    return {id: params.plugin_id};
  }
});
