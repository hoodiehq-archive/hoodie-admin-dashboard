import Ember from 'ember';
/* globals $ */

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('login').get('token')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  // This allows all routes to fetch models that require authentication, such as
  /*

  Ember.$.getJSON('/_api/app/config').then(function(data){
    console.log('data: ',data);
  });

  */
  getJSONWithToken: function(url) {
    var token = this.controllerFor('login').get('token');
    Ember.$.ajaxSetup({
      headers: {
        'Authorization': 'Bearer ' + window.hoodieAdmin.account.bearerToken
      }
    });
    return Ember.$.getJSON(url, { token: token });
  },

  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        console.log('Something went wrong: ', reason);
      }
    }
  }
});
