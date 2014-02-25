var BaseModel = require('../../../helpers/mvc/model');
var app = require('../../../namespace');

var Model = BaseModel.extend({

  defaults: {
    password: ''
  },

  hasValidSession: function () {
    return app.hoodieAdmin.account.hasValidSession();
  },

  hasInvalidSession: function () {
    return app.hoodieAdmin.account.hasInvalidSession();
  },

  signIn: function (username, password) {
    return app.hoodieAdmin.account.signIn(username, password);
  },

  signOut: function () {
    return app.hoodieAdmin.account.signOut();
  },

  validation: {
    password: {
      required: true,
      msg: 'Password can\'t be empty'
    }
  }

});

module.exports = Model;

