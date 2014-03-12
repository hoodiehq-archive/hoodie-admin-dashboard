/*jshint -W079 */
var Controller = require('./controllers/index');

var app = require('../../../helpers/namespace');

app.module('pocket.layout', function () {

  'use strict';

  this.addInitializer(function () {
    var self = this;

    this._controller = new Controller();

    console.info('layout start');

    app.vent.on('app:layout:login', function () {
      self._controller.showLoginLayout(require('./templates/login.hbs'));
    });

    app.vent.on('app:layout:app', function () {
      self._controller.showAppLayout(require('./templates/index.hbs'));
    });

  });

});

module.exports = app;

