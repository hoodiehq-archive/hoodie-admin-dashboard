'use strict';

var Marionette = require('backbone.marionette');

var Tiles = require('./tiles');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  tiles: function (id, action) {
    new Tiles({
      id: id,
      action: action,
      ns: 'tiles'
    });
  }

});

module.exports = Controller;
