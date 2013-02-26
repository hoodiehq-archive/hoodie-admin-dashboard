(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.SidebarView = (function(_super) {

    __extends(SidebarView, _super);

    function SidebarView() {
      this.renderModules = __bind(this.renderModules, this);

      this.updateUserCount = __bind(this.updateUserCount, this);

      this.renderAppName = __bind(this.renderAppName, this);
      return SidebarView.__super__.constructor.apply(this, arguments);
    }

    SidebarView.prototype.template = 'sidebar';

    SidebarView.prototype.handleNavigationStates = function(route) {
      var $el;
      route = route.replace('route:', '');
      $el = $('nav a[href="/#' + route + '"]').parent();
      if (!$el.hasClass("active")) {
        $("nav li.active").removeClass("active");
        return $el.addClass("active");
      }
    };

    SidebarView.prototype.afterRender = function() {
      var _this = this;
      this.loadAppName();
      pocket.router.bind("all", function(route) {
        return _this.handleNavigationStates(Backbone.history.fragment);
      });
      this.loadModules();
      return SidebarView.__super__.afterRender.apply(this, arguments);
    };

    SidebarView.prototype.loadAppName = function() {
      return window.hoodie.admin.getAppInfo().then(this.renderAppName);
    };

    SidebarView.prototype.renderAppName = function(appInfo) {
      this.appInfo = appInfo;
      this.$el.find('header .appName a').text(this.appInfo.name);
      return $('.sidebar header .appName').bigtext({
        maxfontsize: 20
      });
    };

    SidebarView.prototype.getUserModuleLabel = function(totalUsers) {
      this.totalUsers = totalUsers;
      switch (this.totalUsers) {
        case 0:
          return this.label = "No users";
        case 1:
          return this.label = "One user";
        default:
          return this.label = "" + this.totalUsers + " users";
      }
    };

    SidebarView.prototype.updateUserCount = function(eventName, userObject) {
      var _this = this;
      return $.when(window.hoodie.admin.users.getTotal()).then(function(totalUsers) {
        _this.totalUsers = totalUsers;
        return $('.sidebar .modules .users .name').text(_this.getUserModuleLabel(_this.totalUsers));
      });
    };

    SidebarView.prototype.loadModules = function() {
      var debouncedUserCount;
      debouncedUserCount = _.debounce(this.updateUserCount, 300);
      hoodie.admin.users.on("change", function(eventName, userObject) {
        return debouncedUserCount(eventName, userObject);
      });
      hoodie.admin.users.connect();
      return $.when(window.hoodie.admin.modules.findAll(), window.hoodie.admin.users.getTotal()).then(this.renderModules);
    };

    SidebarView.prototype.renderModules = function(modules, totalUsers) {
      var key, module, _ref;
      this.modules = modules;
      this.totalUsers = totalUsers;
      _ref = this.modules;
      for (key in _ref) {
        module = _ref[key];
        module.url = module.id;
        module.cleanName = this.makeURLHuman(module.url);
        if (module.cleanName === "Users") {
          module.cleanName = this.getUserModuleLabel(this.totalUsers);
        }
        module.badgeStatus = 'badge-' + module.status;
        if (module.messages) {
          module.messageAmount = module.messages.length;
        } else {
          module.messageAmount = '';
        }
      }
      return this.$el.find('nav ul.modules').html(Handlebars.VM.template(JST['sidebar-modules'])(this));
    };

    return SidebarView;

  })(Pocket.BaseView);

}).call(this);
