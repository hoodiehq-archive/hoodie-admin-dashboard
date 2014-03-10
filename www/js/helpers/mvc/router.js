require('barf');

var BaseRouter = Backbone.Router.extend({

  before: {
    '*any': function (fragment, args, next) {
      if (app.hoodieAdmin.account.hasValidSession()) {
        app.vent.trigger('layout:app');
        next();
      } else {
        app.vent.trigger('layout:login');
        Backbone.history.navigate('', { trigger: true });
      }
    }
  }

});

module.exports = BaseRouter;

