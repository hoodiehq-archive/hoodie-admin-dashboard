/*jshint -W079 */
var LayoutController = require('./controllers/index');
var app = require('../../../helpers/namespace');

app.module('pocket.layout', function () {
  'use strict';

  this.addInitializer(function (options) {
    var layoutController;

    options.app.components.layout.template = require('./templates/index.hbs');
    layoutController = new LayoutController(options.app.components.layout);

    app.vent.on('app:layout:login', function () {
      layoutController.showLogin();
    });

    app.vent.on('app:layout:app', function () {
      layoutController.showApp();
    });
  });

});
module.exports = app;

