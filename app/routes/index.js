import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  afterModel: function() {
    this.transitionTo('plugins');
  }
});
