import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  submitMessage: '',
  disableAdd: true,
  validations: {
    'model.fromEmail': {
      format: {
        with: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        allowBlank: false,
        message: 'Must be an email address'
      },
      presence: true
    },
    'model.emailUsername': {
      presence: true,
      length: {
        minimum: 5,
        maximum: 100
      }
    },
    'model.emailPassword': {
      presence: true,
      length: {
        minimum: 5,
        maximum: 100
      }
    }
  },
  pristine:{
    model: {
      fromEmail: true,
      emailUsername: true,
      emailPassword: true
    }
  },
  // Prevent submission if form is invalid
  isValidForm: function (classInfo, modelName) {
    if(this.get('isInvalid')){
      this.set('disableAdd', true);
    } else {
      this.set('disableAdd', false);
    }
    this.set('pristine.'+modelName, false);
  }.observes('model.fromEmail', 'model.emailUsername', 'model.emailPassword')
});
