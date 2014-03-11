var Backbone = require('backbone');
var Hoodieadmin = require('hoodie.admin');

var Model = Backbone.Model.extend({

  defaults: {
    password: ''
  },

  initialize: function () {
    this.admin = new Hoodieadmin();
  },

  authenticate: function () {
    return this.admin.account.authenticate();
  },

  hasValidSession: function () {
    return this.admin.account.hasValidSession();
  },

  hasInvalidSession: function () {
    return this.admin.account.hasInvalidSession();
  },

  signIn: function (password) {
    return this.admin.account.signIn(password);
  },

  signOut: function () {
    return this.admin.account.signOut();
  },

  validation: {
    password: {
      required: true,
      msg: 'Password can\'t be empty'
    }
  }

});

module.exports = Model;

