import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this.setProperties({
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
        route.$('.submitMessage').text('Success: added "'+response.id+'" as a new user.');
        route.set('disableAdd', false);
        route.sendAction();
      }).fail(function (error) {
        console.log('error: ',error);
        route.set('disableAdd', false);
        if (error.name === "HoodieConflictError"){
          route.$('.submitMessage').text('Sorry, the user "'+username+'" already exists.');
        } else {
          route.$('.submitMessage').text('Error: '+error.status+' - '+error.responseText);
        }
      });
    },
  }
});
