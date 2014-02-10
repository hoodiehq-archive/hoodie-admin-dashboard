'use strict';

var Marionette = require('backbone.marionette');
var Plugins = require('./plugins');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  plugins: function (name, action) {
    new Plugins({
      name: name,
      action: action,
      ns: 'plugins'
    });
  }

});

module.exports = Controller;
