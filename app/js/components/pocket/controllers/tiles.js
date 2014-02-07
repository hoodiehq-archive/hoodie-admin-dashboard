'use strict';

var Marionette = require('backbone.marionette');

var Collection = require('../collections/tiles');
var Model = require('../models/tile');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    //app.regions.meta.reset();
    //app.regions.viewer.reset();

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, 'reset', function () {

    });

  }

});

module.exports = controller;

