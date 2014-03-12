/*jshint -W079 */
var app = require('../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {

    require('../structural/layout/index');

    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('app:plugins', function (name, action) {
      self._controller.plugins(name, action);
    });

    app.vent.on('app:dashboard', function () {
      self._controller.dashboard();
    });

    app.vent.on('app:user:logout', function () {
      app.hoodieAdmin.signOut();
      Backbone.history.navigate('', {
        trigger: true
      });
    });

  });

});

module.exports = app;
