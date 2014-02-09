'use strict';

var BaseModel = require('../../../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    name: '',
    description: '',
    title: '',
    version: '',
    pos: '',
    width: ''
  }

});

module.exports = Model;
