'use strict';

var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var fs = require('fs');

require('../../../../helpers/handlebars');

var tmpl = fs.readFileSync(__dirname + '/../templates/index.html');

var View = Marionette.ItemView.extend({
  template: Handlebars.compile(tmpl),
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;
