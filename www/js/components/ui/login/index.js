'use strict';

var app = require('../../../helpers/namespace');
var Controller = require('./controllers/index');

app.module('pocket.login', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
    this._controller.show(options);
  });

});

module.exports = app;
