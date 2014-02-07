'use strict';

var app = require('../../../helpers/namespace');

var BaseCollection = require('../../../helpers/mvc/collection');
var Model = require('../models/tile');

var Collection = BaseCollection.extend({
  url: app.request('config').api.url + '_plugins',
  model: Model
});

module.exports = Collection;

