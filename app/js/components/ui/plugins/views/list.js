'use strict';

var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var fs = require('fs');

var tmpl = fs.readFileSync(__dirname + '/../templates/list_item.html');

require('../../../../helpers/handlebars');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: Handlebars.compile(tmpl)
});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;

