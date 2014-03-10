'use strict';
var app = require('../namespace');
var Backbone = require('backbone');

require('barf');

console.log(app);

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
    'plugins': function (fragment, args, next) {

      console.log(fragment, args, next);

      //if (this.user.hasValidSession()) {
        //next();
      //} else {
        //Backbone.history.navigate('', { trigger: true });
      //}
    }
  }

});

module.exports = BaseRouter;

