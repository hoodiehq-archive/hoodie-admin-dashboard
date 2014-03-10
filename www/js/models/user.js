var Backbone = require('backbone');
var app = require('../helpers/namespace');

return Backbone.Model.extend({

  hasValidSession: function () {
    return app.Hoodieadmin.account.hasValidSession();
  },

  hasInvalidSession: function () {
    return app.Hoodieadmin.account.hasInvalidSession();
  },

  signIn: function (username, password) {
    return app.Hoodieadmin.account.signIn(username, password);
  },

  signOut: function () {
    return app.Hoodieadmin.account.signOut();
  },

  validation: {
    password: {
      required: true,
      msg: 'Password can\'t be empty'
    }
  }

});
