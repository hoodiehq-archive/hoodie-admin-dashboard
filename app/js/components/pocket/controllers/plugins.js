'use strict';

var Marionette = require('backbone.marionette');

var Collection = require('../collections/plugins');
var Model = require('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    // require ui dependencies
    require('../../ui/plugins/index');

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({
      reset: true
    });

    this.listenTo(this.collection, 'reset', function () {

      console.log(self.collection);

      switch (self.options.action) {
        case 'show':
          self.show(self.collection);
          break;
        case 'edit':
          self.edit(self.collection);
          break;
        default:
          self.list(self.collection);
      }

      app.vent.trigger('nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    });

  },

  show: function (model) {
    app.vent.trigger('plugins:show', {
      collection: model.collection,
      model: model,
      ns: this.options.ns
    });
  },

  edit: function (model) {
    app.vent.trigger('plugins:edit', {
      collection: model.collection,
      model: model,
      ns: this.options.ns
    });
  },


  list: function (collection) {
    app.vent.trigger('plugins:list', {
      collection: collection,
      ns: this.options.ns
    });
  }

});

module.exports = controller;

