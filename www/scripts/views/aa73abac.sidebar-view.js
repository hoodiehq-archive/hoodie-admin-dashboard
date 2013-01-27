(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.SidebarView = (function(_super) {

    __extends(SidebarView, _super);

    function SidebarView() {
      this.render = __bind(this.render, this);

      this.renderModules = __bind(this.renderModules, this);

      this.renderAppName = __bind(this.renderAppName, this);

      this.renderUserTotal = __bind(this.renderUserTotal, this);
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

    SidebarView.prototype.initialize = function() {
      var _this = this;
      SidebarView.__super__.initialize.apply(this, arguments);
      this.setElement($('.sidebar'));
      this.render();
      this.loadAppName();
      if (pocket.isAuthenticated) {
        pocket.router.bind("all", function(route) {
          return _this.handleNavigationStates(Backbone.history.fragment);
        });
        this.renderCoreFunctions();
        this.loadUserTotal();
        return this.loadModules();
      }
    };

    SidebarView.prototype.renderCoreFunctions = function() {
      return this.$el.find('nav').html(Handlebars.VM.template(JST['sidebar-core'])(this));
    };

    SidebarView.prototype.loadUserTotal = function() {
      return window.hoodie.admin.users.total().then(this.renderUserTotal);
    };

    SidebarView.prototype.renderUserTotal = function(userTotal) {
      this.userTotal = userTotal;
      return this.$el.find('li.users .badge').text(this.userTotal);
    };

    SidebarView.prototype.loadAppName = function() {
      return window.hoodie.admin.app().then(this.renderAppName);
    };

    SidebarView.prototype.renderAppName = function(appInfo) {
      this.appInfo = appInfo;
      return this.$el.find('header h1 a').text(this.appInfo.name);
    };

    SidebarView.prototype.loadModules = function() {
      return window.hoodie.admin.modules.findAll().then(this.renderModules);
    };

    SidebarView.prototype.renderModules = function(modules) {
      var key, module, _ref;
      this.modules = modules;
      _ref = this.modules;
      for (key in _ref) {
        module = _ref[key];
        module.url = module.name.replace('worker-', '');
        module.cleanName = this.makeURLHuman(module.url);
        module.badgeStatus = 'badge-' + module.status;
        if (module.messages) {
          module.messageAmount = module.messages.length;
        } else {
          module.messageAmount = '';
        }
      }
      return this.$el.find('nav ul.modules').html(Handlebars.VM.template(JST['sidebar-modules'])(this));
    };

    SidebarView.prototype.render = function() {
      this.$el.html(Handlebars.VM.template(JST[this.template])(this));
      return SidebarView.__super__.render.apply(this, arguments);
    };

    return SidebarView;

  })(pocket.Views.BaseView);

}).call(this);
