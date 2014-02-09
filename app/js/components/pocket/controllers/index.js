'use strict';

var Marionette = require('backbone.marionette');

var Plugins = require('./plugins');

require('../../ui/logo/index');
require('../../ui/navigation/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
    app.vent.trigger('logo:show', options);
  },

  plugins: function (name, action) {
    new Plugins({
      name: name,
      action: action,
      ns: 'tiles'
    });
  }

});

module.exports = Controller;
