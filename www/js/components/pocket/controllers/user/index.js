'use strict';

var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  login: function (password) {
    app.hoodieAdmin.account.signIn('admin', password);
  },

  logout: function () {
    app.hoodieAdmin.account.signOut();

    app.vent.trigger('app:layout:login');

    Backbone.history.navigate('', {
      trigger: true
    });
  }

});

module.exports = Controller;

