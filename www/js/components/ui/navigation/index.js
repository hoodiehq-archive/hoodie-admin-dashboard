'use strict';

var app = require('../../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket.navigation', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {

    app.vent.on('app:nav:show', function (options) {
      this._controller.show(options);
    }, this);

  });

});

module.exports = app;
