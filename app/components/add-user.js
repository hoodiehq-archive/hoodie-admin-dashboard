import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  showErrors: false,
  validations: {
    'valtest': {
      presence: true
    },
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
  init: function() {
    this.setProperties({
      'submitMessage': '',
      'newUserName': 'heyA',
      'newUserPassword': '',
      'test': 'what the hell',
      disableAdd: false
    });
    this._super.apply(this, arguments);
    this.set('valTest', Ember.computed.alias(this.get('test')));
    console.log('MODEL', Ember.computed.alias(this.get('test')));
  },
  onChange: function () {
    var route = this;
    this.validate().then(function(res){
      console.log('validate res: ',res);
    }).catch(function(error){
      console.log('password', route.get('newUserPassword'));
      console.log('error: ',route.get('errors'));
    });
  }.observes('newUserName', 'newUserPassword', 'test').on('init'),
  actions: {
    addUser: function () {
      var route = this;
      this.set('disableAdd', true);


      return;

      var hoodieId = Math.random().toString().substr(2);
      var newUser = {
        id : this.get('newUserName'),
        name : 'user/'+this.get('newUserName'),
        hoodieId : hoodieId,
        database : 'user/'+hoodieId,
        signedUpAt : new Date(),
        roles : [],
        password : this.get('newUserPassword')
      };

      window.hoodieAdmin.user.add('user', newUser)
      .done(function (response) {
        route.setProperties({
          'submitMessage': 'Success: added <strong>'+response.id+'</strong> as a new user.',
          'newUserName': '',
          'newUserPassword': '',
          'disableAdd': false
        });
        route.sendAction();
      }).fail(function (error) {
        console.log('error: ',error);
        route.set('disableAdd', false);
        if (error.name === "HoodieConflictError"){
          route.setProperties({
            'submitMessage': 'Sorry, the user "'+error.id+'" already exists.',
            'newUserName': '',
            'newUserPassword': '',
            'disableAdd': false
          });
        } else {
          route.setProperties({
            'submitMessage': 'Error: '+error.status+' - '+error.responseText,
            'newUserName': '',
            'newUserPassword': '',
            'disableAdd': false
          });
        }
      });
    },
  }
});
