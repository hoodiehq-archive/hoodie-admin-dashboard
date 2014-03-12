/*jshint -W079 */
var app = require('../../helpers/namespace');
var Controller = require('./controllers/index');

require('../structural/layout/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    this.listenTo(app.vent, 'app:plugins', function (name, action) {
      self._controller.plugins(name, action);
    });

    this.listenTo(app.vent, 'app:dashboard', function () {
      self._controller.dashboard();
    });

    this.listenTo(app.vent, 'app:user:logout', function () {
      app.hoodieAdmin.signOut();
      Backbone.history.navigate('', {
        trigger: true
      });
    });

  });

});

module.exports = app;

