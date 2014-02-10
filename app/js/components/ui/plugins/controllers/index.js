'use strict';

var app = require('../../../../helpers/namespace');
var Marionette = require('backbone.marionette');

var ListView = require('../views/list');
var ShowView = require('../views/show');
var EditView = require('../views/edit');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  list: function (opts) {
    var view = new ListView({
      collection: opts.collection,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  },

  show: function (opts) {
    var view = new ShowView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  },

  edit: function (opts) {
    var view = new EditView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  }

});

module.exports = Controller;
