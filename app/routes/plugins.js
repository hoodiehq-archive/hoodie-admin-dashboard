import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.findAll('plugin');
  }
});
