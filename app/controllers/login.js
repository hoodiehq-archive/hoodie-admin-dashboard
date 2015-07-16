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

  token: localStorage.token,
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  gotoRoute: function (self) {
    var attemptedTransition = self.get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      self.set('attemptedTransition', null);
    } else {
      // Redirect to 'plugins' by default.
      self.transitionToRoute('');
    }
  },

  login: function() {
    var self = this;
    var data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);
    if(window.hoodieAdmin.account.bearerToken){
      self.gotoRoute(self);
    }

    window.hoodieAdmin.account.signIn(data.password)
      .done(function(res){
        self.set('token', res.bearerToken);
        self.gotoRoute(self);
      })
      .fail(function(err) {
        self.set('errorMessage', 'Error: '+err.message);
      });
  }
});
