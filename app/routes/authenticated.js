import Ember from 'ember';

export default Ember.Route.extend({
  // Before the model is loaded, check if the admin is signed in, and redirect to login if not
  beforeModel: function(transition) {
    if (!window.hoodieAdmin.account.isSignedIn()) {
      this.redirectToLogin(transition, false);
    }
  },

  redirectToLogin: function(transition, expired) {
    // Only show the "please log in again" message if explicitly requested
    expired = expired || false;
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login', {expired: expired});
  },

  actions: {
    error: function(reason, transition) {
      // If the token has expired, send back to login
      if (reason.status === 401 || reason.status === 403) {
        this.redirectToLogin(transition, true);
      } else {
        console.log('Something went wrong: ', reason);
      }
    }
  }
});
