require('barf');

var BaseRouter = Backbone.Router.extend({

  constructor: function (options) {
    Backbone.Router.prototype.constructor.call(this, options);

    this.history = [];

    this.on('all', function (route, fragment) {
      var r = route.split(':');

      this.storeRoute();

      if (fragment) {
        r.push(fragment);
      }

      r.shift();

      this.current = r;
      this.prev = this.getPreviousRoute();

      app.vent.trigger('route', this.prev, this.current);

    });

  },

  storeRoute: function () {
    return this.history.push(Backbone.history.fragment);
  },

  getPreviousRoute: function () {
    return this.history[this.history.length - 2];
  },

  before: {
    '*any': function (fragment, args, next) {
      app.hoodieAdmin.authenticate()
      .done(function () {
        app.vent.trigger('app:layout:app');
        next();
      })
      .fail(function () {
        app.vent.trigger('app:layout:login');
      });
    }

  }

});

module.exports = BaseRouter;

