import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  // necessary, because ember doesn't pick up
  // controllers/plugins/email correctly
  controllerName: 'email',
  model: function () {
    var appModel = this.modelFor('plugins');
    return appModel.config;
  }
});
