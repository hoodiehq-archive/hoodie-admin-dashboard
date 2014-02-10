'use strict';

var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var fs = require('fs');

require('../../../../helpers/handlebars');

var tmpl = fs.readFileSync(__dirname + '/../templates/edit.html');

var View = Marionette.ItemView.extend({
  template: Handlebars.compile(tmpl)
});

module.exports = View;
