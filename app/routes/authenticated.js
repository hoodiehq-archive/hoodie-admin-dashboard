import Ember from 'ember';

export default Ember.Route.extend({
  // Before the model is loaded, check if the admin is signed in, and redirect to login if not
  beforeModel: function(transition) {
    if (!window.hoodieAdmin.account.isSignedIn()) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        console.log('Something went wrong: ', reason);
      }
    }
  }
});
