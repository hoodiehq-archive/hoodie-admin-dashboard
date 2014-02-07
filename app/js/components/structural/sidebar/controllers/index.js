'use strict';

var Marionette = require('backbone.marionette');
var View = require('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    app.regions = app.rm.addRegions({
      header: 'header',
      list: '#list'
    });

    // assign a region to the documents container
    this.section = new Marionette.Region({
      el: 'footer'
    });

    this.section.show(new View());

  }
});

module.exports = Controller;
