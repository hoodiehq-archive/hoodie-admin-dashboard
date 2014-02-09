'use strict';

var Marionette = require('backbone.marionette');

var Collection = require('../collections/tiles');
var Model = require('../models/tile');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, 'reset', function () {

      app.vent.trigger('plugin_list:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    });

  }

});

module.exports = controller;

