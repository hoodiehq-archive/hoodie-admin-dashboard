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

  login: function() {
    var self = this, data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    // FIX: this should obviously use hoodie.admin to log in
    if (data.password === 'admin') {
      // FIX: also just a placeholder
      self.set('token', 'yay');
      var attemptedTransition = self.get('attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        self.set('attemptedTransition', null);
      } else {
        // Redirect to 'plugins' by default.
        self.transitionToRoute('plugins');
      }
    }

    /*
    $.post('/auth.json', data).then(function(response) {

      self.set('errorMessage', response.message);
      if (response.success) {
        alert('Login succeeded!');
        self.set('token', response.token);

        var attemptedTransition = self.get('attemptedTransition');
        if (attemptedTransition) {
          attemptedTransition.retry();
          self.set('attemptedTransition', null);
        } else {
          // Redirect to 'plugins' by default.
          self.transitionToRoute('plugins');
        }
      }
    });
    */
  }
});
