require('barf');

var BaseRouter = Backbone.Router.extend({

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

