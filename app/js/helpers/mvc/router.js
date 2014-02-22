'use strict';

require('routefilter');

var Backbone = require('backbone');
var $ = require('jquery');
var app = require('../namespace');

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

  // Before routing, we check whether the user is signed in
  // If not, we save their target route and redirect to login
  before: function (route) {
    var currentRoute = Backbone.history.fragment;
    console.log('user wants route: ', currentRoute);
    console.log('routeAfterSignIn: ', this.routeAfterSignIn);


    if ($.inArray(currentRoute, this.avoidRoute) === -1) {
      console.log('user has no session! redirecting to signIn');
      this.routeAfterSignIn = currentRoute;
      console.log('set routeAfterSignIn: ', this.routeAfterSignIn);
      Backbone.history.navigate('signin', {
        trigger: true
      });
      return false;
    }
    if (currentRoute === this.routeAfterSignIn) {
      console.log('cleared routeAfterSignIn: ', this.routeAfterSignIn);
      this.routeAfterSignIn = '';
    }

    console.log('before:route', route);

  },

  after: function (route) {

    console.log('after:route', route);

    if ($.inArray(route, this.avoidRoute) < 1) {
      this.storeRoute();

      this.current = route.split('/')[0];
      this.prev = this.getPreviousRoute();

      app.vent.trigger('route', this.prev, this.current);
    }

  }

});

module.exports = BaseRouter;

