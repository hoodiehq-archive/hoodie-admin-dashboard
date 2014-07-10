'use strict';

var Marionette = require('backbone.marionette');

require('../../../../helpers/handlebars');

var tmpl = require('../templates/edit.hbs');

var View = Marionette.ItemView.extend({
  template: tmpl
});

module.exports = View;
