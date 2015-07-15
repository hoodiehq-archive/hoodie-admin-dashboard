import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.findAll('plugin', params.plugin_id);
  }
});
