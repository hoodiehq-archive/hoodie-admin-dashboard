var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.container = new Marionette.Region({
      el: '#content',
    });
  },

  createLayout: function (tmpl) {
    return Marionette.Layout.extend({
      template:  function () {
        return tmpl;
      }
    });
  },

  showAppLayout: function (tmpl) {
    var Layout = this.createLayout(tmpl);

    this.container.show(new Layout);

    require('../../sidebar/index');
    require('../../content/index');
    require('../../../ui/logo/index');
    require('../../../ui/navigation/index');
    require('../../../ui/info/index');

  },

  showLoginLayout: function (tmpl) {
    var Layout = this.createLayout(tmpl);

    this.container.show(new Layout);

    app.rm.addRegions({
      login: 'section.login'
    });

    require('../../../ui/login/index');
  }

});

module.exports = Controller;

