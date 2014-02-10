'use strict';

var Marionette = require('backbone.marionette');

var Collection = require('../collections/plugins');
var Model = require('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, 'reset', function () {

      console.log(self.options);

      app.vent.trigger('nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

      self.list(self.collection);

    });

  },

  list: function (collection) {
    app.vent.trigger('plugins:list', {
      collection: collection,
      ns: this.options.ns
    });
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

});

module.exports = controller;

