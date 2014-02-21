/*jshint -W079 */
var Controller = require('./controllers/index');
var app = require('../../../helpers/namespace');

app.module('pocket.content', function () {

  'use strict';

  this.addInitializer(function (options) {

    options.app.components.sidebar.template = require('./templates/index.hbs');

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {
    app.rm.addRegions({
      content: 'section',
      content_header: 'section header',
      content_main: 'section section',
      content_footer: 'section footer'
    });
  });

});

module.exports = app;
