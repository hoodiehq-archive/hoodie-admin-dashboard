'use strict';

var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var fs = require('fs');

var tmpl = fs.readFileSync(__dirname + '/../templates/item.html');

require('../../../../helpers/handlebars');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: Handlebars.compile(tmpl),

  events : {
    'click' : 'show'
  },

  show: function () {
    console.info('show plugin');
  }

});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;

