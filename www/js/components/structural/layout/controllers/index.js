var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {

    'use strict';

    this.options = options || {};
    this.container = new Backbone.Marionette.Region({
      el: '#content'
    });
  },

  showAppLayout: function (tmpl) {
    app.vent.trigger('app:start');
    Marionette.$(this.container.el).html(tmpl);
  },

  showLoginLayout: function (tmpl) {
    app.vent.trigger('app:login');
    Marionette.$(this.container.el).html(tmpl);
  }

});

module.exports = Controller;

