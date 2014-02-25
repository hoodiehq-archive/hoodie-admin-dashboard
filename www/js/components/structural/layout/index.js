/*jshint -W079 */
var Controller = require('./controllers/index');

var app = require('../../../helpers/namespace');

app.module('pocket.layout', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.layout.template = require('./templates/index.hbs');

    this._controller = new Controller(
      options.app.components.layout
    );

  });

});

module.exports = app;
