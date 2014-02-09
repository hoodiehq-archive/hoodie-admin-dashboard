/*jshint -W079 */
var Controller = require('./controllers/index');
var fs = require('fs');
var app = require('../../../helpers/namespace');


app.module('pocket.sidebar', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.sidebar.template = fs.readFileSync(__dirname + '/templates/index.html');

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

});

module.exports = app;
