var Backbone = require('backbone');
var Hoodieadmin = require('hoodie.admin');

var Model = Backbone.Model.extend({

  initialize: function () {
    this.admin = new Hoodieadmin();
  },

  hasValidSession: function () {
    return this.admin.account.hasValidSession();
  },

  hasInvalidSession: function () {
    return this.admin.account.hasInvalidSession();
  },

  signIn: function (username, password) {
    return this.admin.account.signIn(username, password);
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

