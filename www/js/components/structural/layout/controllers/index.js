var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    options = options || {};
    this.options = options;

    // create layout object passing in a template string
    var Layout = Marionette.Layout.extend({
      template:  function () {
        return options.template;
      }
    });

    this.container = new Marionette.Region({
      el: '#content',
    });

    this.container.show(new Layout);

    // login
    app.rm.addRegions({ login: '[data-component=login]' });
    require('../../../ui/login/index');

    // main app
    require('../../sidebar/index');
    require('../../content/index');
    require('../../../ui/logo/index');
    require('../../../ui/navigation/index');
    require('../../../ui/info/index');
  },

  showLogin: function () {
    this.container.$el.attr('data-state', 'signed-out');
  },

  showApp: function () {
    this.container.$el.attr('data-state', 'signed-in');
  },

});

module.exports = Controller;

