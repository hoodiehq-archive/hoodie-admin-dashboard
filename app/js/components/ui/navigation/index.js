'use strict';

var app = require('../../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('navigation', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('nav:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;
