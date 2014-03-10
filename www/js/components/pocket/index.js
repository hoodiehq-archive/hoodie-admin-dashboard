/*jshint -W079 */
var app = require('../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {
    require('../structural/layout/index');
    require('../structural/sidebar/index');
    require('../structural/content/index');

    // boot up default UI components
    app.vent.on('app:start', function () {

      require('../ui/logo/index');
      require('../ui/navigation/index');
      require('../ui/info/index');
    });

    app.vent.on('app:login', function () {
      require('../ui/login/index');
    });

    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins', function (name, action) {
      self._controller.plugins(name, action);
    });

  });

});

module.exports = app;
