'use strict';

var Marionette = require('backbone.marionette');
var View = require('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
    this.show();
  },

  show: function () {
    var view = new View();
    app.rm.get('login').show(view);
  }

});

module.exports = Controller;
