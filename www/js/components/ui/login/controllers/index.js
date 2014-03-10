'use strict';

var Marionette = require('backbone.marionette');
var View = require('../views/index');
var User =  require('../../../../models/user');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
    this.user = new User();
    this.show();
  },

  show: function () {
    var view = new View({
      model: this.user
    });

    app.rm.get('login').show(view);
  }

});

module.exports = Controller;

