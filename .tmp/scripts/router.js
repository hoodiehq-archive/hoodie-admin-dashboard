(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "": "dashboard",
      "modules/:moduleName": "modules"
    };

    Router.prototype.dashboard = function() {
      var view;
      view = new Pocket.DashboardView;
      pocket.app.views.body.setView(".main", view);
      return $.when(hoodie.admin.app.getStats(1358610679), hoodie.admin.config.get()).then(function(stats, appConfig) {
        view.stats = stats;
        view.appConfig = appConfig;
        return view.render();
      });
    };

    Router.prototype.modules = function(moduleName) {
      var view;
      console.log(moduleName);
      view = new Pocket.ModulesView;
      pocket.app.views.body.setView(".main", view);
      return window.hoodie.admin.modules.find(moduleName).then(function(module) {
        view.module = module;
        return view.render();
      });
    };

    return Router;

  })(Backbone.Router);

}).call(this);
