import Ember from 'ember';

export default Ember.Controller.extend({
  submitMessage: '',
  newPassword: '',
  actions: {
    updatePassword: function (password) {
      var controller = this;
      window.hoodieAdmin.user.update('user', this.model.proper_name, {
        password: password
      }).done(function(){
        controller.setProperties({
          'submitMessage': 'Successfully updated password.',
          'newPassword': ''
        });
      }).fail(function (error) {
        controller.setProperties({
          'submitMessage': 'Error: '+error.status+' - '+error.responseText,
          'newPassword': ''
        });
      });
    }
  }
});
