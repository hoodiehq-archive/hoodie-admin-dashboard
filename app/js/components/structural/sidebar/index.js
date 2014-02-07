/*jshint -W079 */
var app = require('../../helpers/namespace');
var fs = require('fs');

var Controller = require('./controllers/index');
var LayoutController = require('./controllers/layout');

app.module('pocket.sidebar', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.sidebar.template = fs.readFileSync(__dirname + '/templates/layout/index.html');

    this._controller = new Controller(
      options.app.components.sidebar
    );

    this._layout = new LayoutController(options);

  });

});

module.exports = app;
