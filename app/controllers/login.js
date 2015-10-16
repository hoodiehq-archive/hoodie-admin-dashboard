import Ember from 'ember';

export default Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      // Username is always 'admin'
      username: 'admin',
      password: '',
      errorMessage: ''
    });
  },

  // Adds the bearer token to all ajax requests, if it's present, otherwise redirect to login
  setBearerToken: function () {
    if(window.hoodieAdmin.account.bearerToken){
      Ember.$.ajaxSetup({
        headers: {
          'Authorization': 'Bearer ' + window.hoodieAdmin.account.bearerToken
        }
      });
    } else {
      this.transitionToRoute('login');
    }
  },

  // Either continue with the route set before the user had to auth,
  // or go to a default route.
  gotoRoute: function (self) {
    self.setBearerToken();
    var attemptedTransition = self.get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      self.set('attemptedTransition', null);
    } else {
      // Redirect to 'plugins' by default.
      self.transitionToRoute('plugins');
    }
  },

  login: function() {
    var self = this;
    var data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    // If signed in, go somewhere else
    if(window.hoodieAdmin.account.isSignedIn){
      self.gotoRoute(self);
    }

    window.hoodieAdmin.account.signIn(data.password)
      .done(function(){
        self.gotoRoute(self);
      })
      .fail(function(err) {
        if(err.status === 401){
          self.set('errorMessage', 'Error: The password is incorrect.');
        } else {
          self.set('errorMessage', 'Error: '+err.message);
        }
      });
  }
});
