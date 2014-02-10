/*jshint -W079 */
var Controller = require('./controllers/index');
var fs = require('fs');
var app = require('../../../helpers/namespace');


app.module('pocket.content', function () {

  'use strict';

  this.addInitializer(function (options) {

    options.app.components.sidebar.template = fs.readFileSync(__dirname + '/templates/index.html');

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {
    app.rm.addRegions({
      content: 'section',
      content_main: 'section iframe',
      content_footer: 'section footer'
    });
  });

});

module.exports = app;
