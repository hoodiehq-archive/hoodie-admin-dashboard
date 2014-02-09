'use strict';

var Marionette = require('backbone.marionette');

var Tiles = require('./tiles');

require('../../ui/logo/index');
require('../../ui/plugin_list/index');

var Controller = Marionette.Controller.extend({


  initialize: function (options) {
    this.options = options || {};
    app.vent.trigger('logo:show', options);
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
