(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.sidebarView = (function(_super) {

    __extends(sidebarView, _super);

    function sidebarView() {
      this.render = __bind(this.render, this);

      this.renderModules = __bind(this.renderModules, this);

      this.renderAppName = __bind(this.renderAppName, this);

      this.renderUserTotal = __bind(this.renderUserTotal, this);
      return sidebarView.__super__.constructor.apply(this, arguments);
    }

    sidebarView.prototype.template = 'sidebar';

    sidebarView.prototype.handleNavigationStates = function(route) {
      var $el;
      route = route.replace('route:', '');
      $el = $('nav a[href="/#' + route + '"]').parent();
      if (!$el.hasClass("active")) {
        $("nav li.active").removeClass("active");
        return $el.addClass("active");
      }
    };

    sidebarView.prototype.initialize = function() {
      var _this = this;
      sidebarView.__super__.initialize.apply(this, arguments);
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

    sidebarView.prototype.renderCoreFunctions = function() {
      return this.$el.find('nav').html(Handlebars.VM.template(JST['sidebar-core'])(this));
    };

    sidebarView.prototype.loadUserTotal = function() {
      return window.hoodie.admin.users.total().then(this.renderUserTotal);
    };

    sidebarView.prototype.renderUserTotal = function(userTotal) {
      this.userTotal = userTotal;
      return this.$el.find('li.users .badge').text(this.userTotal);
    };

    sidebarView.prototype.loadAppName = function() {
      return window.hoodie.admin.app().then(this.renderAppName);
    };

    sidebarView.prototype.renderAppName = function(appInfo) {
      this.appInfo = appInfo;
      return this.$el.find('header h1 a').text(this.appInfo.name);
    };

    sidebarView.prototype.loadModules = function() {
      return window.hoodie.admin.modules.findAll().then(this.renderModules);
    };

    sidebarView.prototype.renderModules = function(modules) {
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

    sidebarView.prototype.render = function() {
      this.$el.html(Handlebars.VM.template(JST[this.template])(this));
      return sidebarView.__super__.render.apply(this, arguments);
    };

    return sidebarView;

  })(pocket.Views.baseView);

}).call(this);
