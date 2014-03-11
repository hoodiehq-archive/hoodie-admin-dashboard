'use strict';

var Marionette = require('backbone.marionette');
var View = require('../views/index');
var User =  require('../../../../models/user');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.user = new User();
    this.view = new View({
      model: this.user
    });

    this.show();
  },

  show: function () {
    app.rm.get('login').show(this.view);
  }

});

module.exports = Controller;

