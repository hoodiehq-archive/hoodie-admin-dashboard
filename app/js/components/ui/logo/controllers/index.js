'use strict';

var app = require('../../../../helpers/namespace');
var Marionette = require('backbone.marionette');
var View = require('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    // TODO: needs to come from the pocket components model
    //
    this.options.model = new Backbone.Model({
      name: 'minutes.io'
    });

    this.show(this.options);
  },

  show: function (opts) {
    var view = new View({
      model: opts.model
    });

    app.regions.sidebar_logo.show(view);
  }

});

module.exports = Controller;
