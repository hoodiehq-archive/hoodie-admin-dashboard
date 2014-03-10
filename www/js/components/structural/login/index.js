/*jshint -W079 */
var Controller = require('./controllers/index');
var app = require('../../../helpers/namespace');


app.module('pocket.loginview', function () {

  'use strict';

  this.addInitializer(function (options) {

    this._controller = new Controller(
      options.template = require('./templates/index.hbs')()
    );

  });

  this.on('before:start', function () {

    app.rm.addRegions({
      login: 'login'
    });

  });

});

module.exports = app;
