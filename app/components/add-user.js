import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  // ember-validations
  validations: {
    'model.newUserName': {
      // Custom validator at app/validators/local/username.js
      username: true
    },
    'model.newUserPassword': {
      presence: true,
      length: {
        minimum: 5,
        maximum: 100
      }
    }
  },
  model: {
    submitMessage: '',
    newUserName: '',
    newUserPassword: '',
    disableAdd: true
  },
  // Track whether any input has been made on each model
  // We only want to show validation messages after actual inputs,
  // and we want to be able to reset them
  pristine:{
    model: {
      newUserName: true,
      newUserPassword: true
    }
  },

  // Prevent submission if form is invalid
  isValidForm: function (classInfo, modelName) {
    if(this.get('isInvalid')){
      this.set('model.disableAdd', true);
    } else {
      this.set('model.disableAdd', false);
    }
    this.set('pristine.'+modelName, false);
  }.observes('model.newUserName', 'model.newUserPassword'),

  actions: {
    addUser: function () {
      var component = this;

      // Block repeated submission while submitting
      this.set('model.disableAdd', true);

      // Generate new user object
      var hoodieId = Math.random().toString().substr(2);
      var newUser = {
        id : this.get('model.newUserName'),
        name : 'user/'+this.get('model.newUserName'),
        hoodieId : hoodieId,
        database : 'user/'+hoodieId,
        signedUpAt : new Date(),
        roles : [],
        password : this.get('model.newUserPassword')
      };

      // Send new user object to Hoodie
      window.hoodieAdmin.user.add('user', newUser)
      .done(function (response) {
        // On success, reset form and show success message
        component.reset('Success: added <strong>'+response.id+'</strong> as a new user.');
      }).fail(function (error) {
        // On conflict (user already exists), reset form and show conflict message
        if (error.name === "HoodieConflictError"){
          component.reset('Sorry, the user <strong>'+error.id+'</strong> already exists.');
        } else {
          // On any other error, reset form and show error message
          component.reset('<strong>Error:</strong> '+error.status+' - '+error.responseText);
          console.log('error: ',error);
        }
      });
    }
  },

  // Reset the inputs, the message, re-enable the submit button, and set pristine to
  // true for all inputs
  reset: function (message) {
    this.setProperties({
      'model.submitMessage': message,
      'model.newUserName': '',
      'model.newUserPassword': '',
      'model.disableAdd': false
    });
    this.set('pristine.model.newUserName', true);
    this.set('pristine.model.newUserPassword', true);
  }
});
