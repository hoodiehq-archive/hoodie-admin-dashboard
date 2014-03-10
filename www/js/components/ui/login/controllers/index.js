'use strict';

var Marionette = require('backbone.marionette');
var View = require('../views/index');

var $ = Marionette.$;

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.show(this.options);
  },

  show: function () {
    var view = new View();

    $('.login').html(view.el);
  }

});

module.exports = Controller;
