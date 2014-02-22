'use strict';

var app = require('../../../../helpers/namespace');
var Marionette = require('backbone.marionette');
var View = require('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.options.model = new Backbone.Model({
      name: options.app.name
    });

    this.show(this.options);
  },

  show: function (opts) {
    console.log('model: ', opts.model);
    var view = new View({
      model: opts.model
    });

    app.rm.get('sidebar_logo').show(view);
  }

});

module.exports = Controller;
