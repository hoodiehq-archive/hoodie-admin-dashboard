import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this.setProperties({
      'submitMessage': '',
      'newUserName': '',
      'newUserPassword': '',
      disableAdd: false
    });
    this._super.apply(this, arguments);
  },
  actions: {
    addUser: function () {
      var route = this;
      this.set('disableAdd', true);

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
