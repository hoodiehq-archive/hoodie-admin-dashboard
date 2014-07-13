'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

require('../../../../helpers/handlebars');

var tmpl = require('../templates/show.hbs');


var View = Marionette.ItemView.extend({
  template: tmpl,
  initialize: function (options) {
    this.options = options || {};
    _.bindAll(this, 'injectHoodieAdmin');
  },
  ui: {
    iframe: 'iframe'
  },
  onRender: function () {
    this.ui.iframe.on('load', this.injectHoodieAdmin);
  },
  injectHoodieAdmin: function () {
    this.ui.iframe[0].contentWindow.require = require;
    this.ui.iframe[0].contentWindow.hoodieAdmin = app.request('admin');
  }
});

module.exports = View;
