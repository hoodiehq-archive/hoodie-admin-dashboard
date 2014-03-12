require('barf');

var BaseRouter = Backbone.Router.extend({

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

