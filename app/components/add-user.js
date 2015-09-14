import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  showErrors: false,
  validations: {
    'model.newUserName': {
      // app/validators/local/username.js
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
  isValidForm: function () {
    if(this.get('isInvalid')){
      this.set('model.disableAdd', true);
    } else {
      this.set('model.disableAdd', false);
    }
  }.observes('model.newUserName', 'model.newUserPassword'),
  actions: {
    addUser: function () {
      var component = this;
      this.set('model.disableAdd', true);

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

      window.hoodieAdmin.user.add('user', newUser)
      .done(function (response) {
        component.setProperties({
          'model.submitMessage': 'Success: added <strong>'+response.id+'</strong> as a new user.',
          'model.newUserName': '',
          'model.newUserPassword': '',
          'model.disableAdd': false
        });
        component.sendAction();
      }).fail(function (error) {
        console.log('error: ',error);
        component.set('model.disableAdd', false);
        if (error.name === "HoodieConflictError"){
          component.setProperties({
            'model.submitMessage': 'Sorry, the user "'+error.id+'" already exists.',
            'model.newUserName': '',
            'model.newUserPassword': '',
            'model.disableAdd': false
          });
        } else {
          component.setProperties({
            'model.submitMessage': 'Error: '+error.status+' - '+error.responseText,
            'model.newUserName': '',
            'model.newUserPassword': '',
            'model.disableAdd': false
          });
        }
      });
    },
  }
});
