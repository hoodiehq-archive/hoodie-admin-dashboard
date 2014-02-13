'use strict';

require('routefilter');

var Backbone = require('backbone');

var BaseRouter = Backbone.Router.extend({

  before: function (route) {
    console.log('before:route', route);
  },

  after: function (route) {
    console.log('after:route', route);
  }

});

module.exports = BaseRouter;

