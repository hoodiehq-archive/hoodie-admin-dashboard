'use strict';

var Marionette = require('backbone.marionette');

require('../../../../helpers/handlebars');

require('gridster');

var tmpl = require('../templates/list_item.hbs');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: tmpl
});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;

