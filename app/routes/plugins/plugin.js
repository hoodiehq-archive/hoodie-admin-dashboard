import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    var plugins = this.modelFor('plugins');
    debugger;
    return plugins.findBy('id', params.plugin_id)
  }
});
