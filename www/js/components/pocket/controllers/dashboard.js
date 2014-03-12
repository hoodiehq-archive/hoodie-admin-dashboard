'use strict';

var Marionette = require('backbone.marionette');
var $ = Marionette.$;

var Collection = require('../collections/plugins');
var Model = require('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();

    $.when(this.collection.fetch()).done(function () {

    }).fail(function () {
      throw new Error('failed to fetch plugins');
    });

  }

});

module.exports = controller;

