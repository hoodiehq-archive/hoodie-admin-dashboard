import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // TODO: we're not using this atm
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Bearer ' + window.hoodieAdmin.account.bearerToken
      }
    });
    Ember.$.getJSON('/_api/app/config').then(function(data){
      console.log('data: ',data);
    });
  },
  afterModel: function() {
    this.transitionTo('plugins');
  }
});
