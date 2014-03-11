/*jshint -W079 */
var Controller = require('./controllers/index');

var app = require('../../../helpers/namespace');

app.module('pocket.layout', function () {

  'use strict';

  this.addInitializer(function () {
    this._controller = new Controller();
  });

  this.on('before:start', function () {

    var self = this;

    this.listenTo(app.vent, 'app:layout:login', function () {
      self._controller.showLoginLayout(require('./templates/login.hbs'));
    });

    this.listenTo(app.vent, 'app:layout:app', function () {
      self._controller.showAppLayout(require('./templates/index.hbs'));
    });

  });

});

module.exports = app;

