'use strict';

var BaseRouter = require('./helpers/mvc/router');

var Router = BaseRouter.extend({
  routes: {
    ''                      : 'index',
    'signIn'                : 'signIn',
    'signOut'               : 'signOut',
    'plugins/:filter'       : 'plugins',
    '*defaults'             : 'plugins'
  },

  index: function () {
    // no dashboard for now
    this.navigate('plugins/appconfig/show', {trigger: true, replace: true});
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

  signOut: function () {
    app.vent.trigger('app:user:signout');
  },

});

module.exports = Router;

