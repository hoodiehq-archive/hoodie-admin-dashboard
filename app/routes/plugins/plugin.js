import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    return this.store.find('plugin', params.plugin_id);
  }
});
