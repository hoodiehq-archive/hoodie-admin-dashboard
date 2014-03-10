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

    this.listenTo(app.vent, 'layout:login', function () {
      console.log('show login');
      self._controller.showLoginLayout(require('./templates/login.hbs')());
    });

    this.listenTo(app.vent, 'layout:app', function () {
      self._controller.showAppLayout(require('./templates/index.hbs')());
    });

  });

});

module.exports = app;

