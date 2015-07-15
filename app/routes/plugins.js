import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    var plugins = this.store.findAll('plugin');
    console.log('plugins: ',plugins);
    return plugins;
  }
});
