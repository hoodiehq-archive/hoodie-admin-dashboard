require('barf');

var BaseRouter = Backbone.Router.extend({

  constructor: function (options) {
    Backbone.Router.prototype.constructor.call(this, options);

    this.history = [];
    this.avoidRoute = ['login', 'logout'];
  },

  storeRoute: function () {
    this.history.push(Backbone.history.fragment.split('/')[0]);
  },

  getPreviousRoute: function () {
    return this.history[this.history.length - 2];
  },

  before: {
    '*plugins(/:filter)': function (fragment, args, next) {
      app.hoodieAdmin.account.authenticate()
      .done(function () {
        app.vent.trigger('app:layout:app');
        next();
      })
      .fail(function () {
        app.vent.trigger('app:layout:login');
        app.vent.trigger('app:login');
      });
    }

  }

});

module.exports = BaseRouter;

