'use strict';

var app = require('../../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket.plugins', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins:list', function (options) {
      self._controller.list(options);
    });

    app.vent.on('plugins:show', function (options) {
      self._controller.show(options);
    });

    app.vent.on('plugins:edit', function (options) {
      self._controller.edit(options);
    });

  });

});

module.exports = app;
