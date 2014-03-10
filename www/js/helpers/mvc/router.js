require('barf');

var BaseRouter = Backbone.Router.extend({

  before: {

    '*any': function (fragment, args, next) {
      if (app.hoodieAdmin.account.hasValidSession()) {
        next();
      } else {
        // move these events elsewhere
        app.vent.trigger('layout:login');
        Backbone.history.navigate('', { trigger: true });
      }
    }

  }

});

module.exports = BaseRouter;

