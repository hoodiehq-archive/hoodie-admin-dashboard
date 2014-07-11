'use strict';

var BaseRouter = require('./helpers/mvc/router');

var Router = BaseRouter.extend({

  routes: {
    'logout'                : 'logout',
    // ''                      : 'dashboard',
    'plugins/:filter'       : 'plugins',
    '*defaults'             : 'plugins'
  },

  plugins: function (filter) {
    if (filter) {
      var action = filter.split('/')[2] || '';
      var name = filter.split('/')[1] || filter;

      app.vent.trigger('app:plugins', name, action);
    } else {
      app.vent.trigger('app:plugins');
    }

  },

  // dashboard: function () {
  //   app.vent.trigger('app:dashboard');
  // },

  logout: function () {
    app.vent.trigger('app:user:logout');
    app.vent.trigger('app:layout:login');
  },

  login: function () {
    app.vent.trigger('app:layout:login');
    app.vent.trigger('app:user:logout');
  }

});

module.exports = Router;

