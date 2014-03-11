'use strict';

var app = require('../../../../helpers/namespace');
var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var View = require('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  show: function (opts) {

    opts.collection.add(new Backbone.Model({
      name: 'dashboard'
    }), {
      at: 0
    });

    var view = new View({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('sidebar_nav').show(view);
  }

});

module.exports = Controller;
