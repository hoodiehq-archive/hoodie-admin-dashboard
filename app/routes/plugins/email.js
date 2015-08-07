import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  // necessary, because ember doesn't pick up
  // controllers/plugins/email correctly
  controllerName: 'email',
  model: function () {
    var store = this.store;
    // TODO: This only returns a single record, but I can't make
    // it work with findRecord or just find with an id :/
    return store.findAll('emailConfig').then(function(emailConfig) {
      return {
        config: emailConfig,
        templates: store.peekAll('emailTemplate')
      };
    });
  }
});
