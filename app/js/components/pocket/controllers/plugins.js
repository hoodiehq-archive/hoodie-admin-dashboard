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

      app.vent.trigger('nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    });

  }

});

module.exports = controller;

