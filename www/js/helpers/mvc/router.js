'use strict';

require('barf');

var BaseRouter = Backbone.Router.extend({

  constructor: function (options) {
    Backbone.Router.prototype.constructor.call(this, options);
    this.history = [];
    this.routeAfterSignIn = '';
    this.avoidRoute = ['signup', 'signin', 'signout', 'reset', '*defaults'];
  },

  storeRoute: function () {
    this.history.push(Backbone.history.fragment.split('/')[0]);
  },

  getPreviousRoute: function () {
    return this.history[this.history.length - 2];
  },

  before: {
    '*any': function (fragment, args, next) {
      if (app.hoodieAdmin.account.hasValidSession()) {
        app.vent.trigger('layout:app');
        next();
      } else {
        app.vent.trigger('layout:login');
        Backbone.history.navigate('', { trigger: true });
      }
    }
  }

});

module.exports = BaseRouter;

