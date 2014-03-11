var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {

    'use strict';

    this.options = options || {};
  },

  showAppLayout: function (tmpl) {

    var Layout = Marionette.Layout.extend({
      template:  function () {
        return tmpl;
      }
    });

    this.container = new Marionette.Region({
      el: '#content',
    });

    this.container.reset();
    this.container.show(new Layout);
  },

  showLoginLayout: function (tmpl) {

    var Layout = Marionette.Layout.extend({
      template:  function () {
        return tmpl;
      }
    });

    this.container = new Marionette.Region({
      el: '#content',
    });

    this.container.reset();
    this.container.show(new Layout);

    app.rm.addRegions({
      login: 'section.login'
    });

  }

});

module.exports = Controller;

