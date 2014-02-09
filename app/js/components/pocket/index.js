/*jshint -W079 */
var app = require('../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {
    this._controller = new Controller(options);

    app.regions = app.rm.addRegions({
      sidebar: 'aside',
      sidebar_logo: 'aside header',
      sidebar_plugin_list: 'aside #plugin-list',
      content: 'section'
    });

  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('tiles', function (filter, id) {
      self._controller.tiles(filter, id);
    });

  });

});

module.exports = app;
