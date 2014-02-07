'use strict';

var BaseModel = require('../../../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    description: '',
    title: '',
    pos: '',
    width: ''
  }

});

module.exports = Model;
