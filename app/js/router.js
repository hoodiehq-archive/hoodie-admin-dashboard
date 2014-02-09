'use strict';

var Router = Backbone.Router.extend({

  routes: {
    ''                      : 'plugins',
    'plugins/:name'         : 'plugins',
    '*defaults'             : 'plugins'
  },

  plugins: function (name, action) {
    app.vent.trigger('plugins', name, action);
  }

});

module.exports = Router;
