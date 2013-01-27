(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.ApplicationView = (function(_super) {

    __extends(ApplicationView, _super);

    function ApplicationView() {
      this.initViews = __bind(this.initViews, this);
      return ApplicationView.__super__.constructor.apply(this, arguments);
    }

    ApplicationView.prototype.events = {
      "click a": "handleLinks"
    };

    ApplicationView.prototype.initialize = function() {
      ApplicationView.__super__.initialize.apply(this, arguments);
      this.setElement($('html'));
      window.hoodie.admin.app().then(this.initViews);
      return null;
    };

    ApplicationView.prototype.initViews = function(appInfo) {
      this.appInfo = appInfo;
      pocket.appInfo = this.appInfo;
      pocket.appInfo.defaultReplyMailAddress = this.defaultReplyMail(this.appInfo.name);
      this.sidebar = new pocket.Views.SidebarView;
      this.dashboard = new pocket.Views.DashboardView;
      this.users = new pocket.Views.UsersView;
      this.modules = new pocket.Views.ModulesView;
      return null;
    };

    ApplicationView.prototype.handleLinks = function(event) {
      var path;
      path = $(this).attr('href');
      if (/\.pdf$/.test(path)) {
        return true;
      }
      if (/^\/[^\/]/.test(path)) {
        router.navigate(path.substr(1), true);
        return false;
      }
    };

    return ApplicationView;

  })(pocket.Views.BaseView);

}).call(this);
