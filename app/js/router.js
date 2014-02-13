'use strict';

var BaseRouter = require('./helpers/mvc/router');

var Router = BaseRouter.extend({

  routes: {
    ''                      : 'plugins',
    'plugins/:name'         : 'plugins',
    '*defaults'             : 'plugins'
  },

  plugins: function (filter) {
    if (filter) {
      var action = filter.split('/')[2] || '';
      var name = filter.split('/')[1] || filter;

      app.vent.trigger('plugins', name, action);
    } else {
      app.vent.trigger('plugins');
    }

  }

});

module.exports = Router;

