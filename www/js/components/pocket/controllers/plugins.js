'use strict';

var Marionette = require('backbone.marionette');
var $ = Marionette.$;

var PluginsCollection = require('../collections/plugins');
var PluginModel = require('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    // require ui dependencies
    require('../../ui/plugins/index');

    this.options = options || {};

    this.model = new PluginModel();
    this.collection = new PluginsCollection();

    $.when(this.collection.fetch()).done(function () {

      switch (self.options.action) {
        case 'show':
          self.show(self.collection.get(self.options.name));
          break;
        case 'edit':
          self.edit(self.collection.get(self.options.name));
          break;
        default:
          self.list(self.collection);
      }

      app.vent.trigger('app:nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    }).fail(function () {
      throw new Error('failed to fetch plugins');
    });

  },

  show: function (model) {
    app.vent.trigger('app:plugins:show', {
      collection: model.collection,
      model: model
    });
  },

  edit: function (model) {
    app.vent.trigger('app:plugins:edit', {
      collection: model.collection,
      model: model
    });
  },

  list: function (collection) {
    app.vent.trigger('app:plugins:list', {
      collection: collection
    });
  }

});

module.exports = controller;

