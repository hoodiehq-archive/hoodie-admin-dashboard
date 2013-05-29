(function() {
  var whereTheMagicHappens;

  if (location.hostname === 'localhost' && location.port === "9000") {
    whereTheMagicHappens = "http://pocket.dev/_api";
  } else {
    whereTheMagicHappens = void 0;
  }

  window.hoodieAdmin = new HoodieAdmin(whereTheMagicHappens);

  Backbone.Layout.configure({
    manage: true,
    fetch: function(path) {
      return JST[path];
    }
  });

  jQuery(document).ready(function() {
    return new Pocket;
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Pocket = (function(_super) {

    __extends(Pocket, _super);

    function Pocket() {
      this.setAppInfo = __bind(this.setAppInfo, this);

      this.loadAppInfo = __bind(this.loadAppInfo, this);

      this.onSignOutSuccess = __bind(this.onSignOutSuccess, this);

      this.onSignOutFail = __bind(this.onSignOutFail, this);

      this.handleAuthenticateError = __bind(this.handleAuthenticateError, this);

      this.handleAuthenticateSuccess = __bind(this.handleAuthenticateSuccess, this);

      this.authenticate = __bind(this.authenticate, this);

      var _this = this;
      window.pocket = this;
      this.setElement('html');
      this.registerHandlebarsHelpers();
      this.registerListeners();
      this.handleSignInAndSignOut();
      $.when(this.loadAppInfo(), this.authenticate()).then(function() {
        _this.router = new Pocket.Router;
        _this.app = new Pocket.ApplicationView;
        return Backbone.history.start();
      });
    }

    Pocket.prototype.setElement = function(selector) {
      return this.$el = $(selector);
    };

    Pocket.prototype.authenticate = function() {
      return hoodieAdmin.authenticate().then(this.handleAuthenticateSuccess, this.handleAuthenticateError);
    };

    Pocket.prototype.handleAuthenticateSuccess = function() {
      this.isAuthenticated = true;
      this.$el.addClass('authenticated');
      return hoodieAdmin.resolveWith(this.isAuthenticated);
    };

    Pocket.prototype.handleAuthenticateError = function() {
      this.isAuthenticated = false;
      return hoodieAdmin.resolveWith(this.isAuthenticated);
    };

    Pocket.prototype.handleConditionalFormElements = function(el, speed) {
      var condition, conditions, requirement, requirementMet, target, _i, _len, _results;
      if (speed == null) {
        speed = 250;
      }
      conditions = $(el).data("conditions");
      conditions = conditions.split(',');
      _results = [];
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        condition = conditions[_i];
        requirement = condition.split(':')[0];
        target = condition.split(':')[1];
        requirementMet = false;
        if ($(el).is('input[type=checkbox]')) {
          if ($(el).is(':checked') && requirement === "true") {
            requirementMet = true;
          }
          if (!$(el).is(':checked') && requirement === "false") {
            requirementMet = true;
          }
        }
        if ($(el).val() === requirement) {
          requirementMet = true;
        }
        if (requirementMet) {
          _results.push($(target).slideDown(speed));
        } else {
          _results.push($(target).slideUp(speed));
        }
      }
      return _results;
    };

    Pocket.prototype.registerListeners = function() {
      var _this = this;
      $("body").on("change", ".formCondition", function(event) {
        return _this.handleConditionalFormElements(event.target);
      });
      $("body").on("click", "a.signOut", function(event) {
        event.preventDefault();
        return hoodieAdmin.signOut().done(_this.onSignOutSuccess).fail(_this.onSignOutFail);
      });
      return $("body").on("click", ".toggler", function(event) {
        $(this).toggleClass('open');
        return $(this).siblings('.togglee').slideToggle(150);
      });
    };

    Pocket.prototype.registerHandlebarsHelpers = function() {
      Handlebars.registerHelper('testHelper', function(name, context) {
        return "HANDLEBARS TESTHELPER";
      });
      Handlebars.registerHelper('convertTimestampToISO', function(timestamp) {
        if (!timestamp) {
          return;
        }
        if (timestamp.toString().length === 10) {
          timestamp += '000';
        }
        return JSON.parse(JSON.stringify(new Date(parseInt(timestamp))));
      });
      Handlebars.registerHelper('convertISOToTimestamp', function(ISODate) {
        if (!ISODate) {
          return;
        }
        return new Date(ISODate).getTime();
      });
      Handlebars.registerHelper('convertISOToHuman', function(ISODate) {
        return "hey " + ISODate;
      });
      Handlebars.registerHelper('defaultReplyMailAddress', function() {
        if (!pocket.appInfo.name) {
          return "please-reply@your-app.com";
        }
        if (pocket.appInfo.name.indexOf(".") === -1) {
          return "please-reply@" + pocket.appInfo.name + ".com";
        } else {
          return "please-reply@" + pocket.appInfo.name;
        }
        return pocket.appInfo.defaultReplyEmailAddress;
      });
      Handlebars.registerHelper('linkToFutonUser', function(userName) {
        var couchUrl;
        couchUrl = hoodieAdmin.baseUrl.replace('http://', 'http://couch.').replace('_api', '_utils');
        return couchUrl + '/document.html?_users/org.couchdb.user:' + userName;
      });
      Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("\nCurrent Context");
        console.log("====================");
        console.log(this);
        if (arguments.length > 1) {
          console.log("Value");
          console.log("====================");
          return console.log(optionalValue);
        }
      });
      Handlebars.registerHelper('positiveSuccessNegativeWarning', function(value) {
        if (value > 0) {
          return 'success';
        } else {
          return 'warning';
        }
      });
      Handlebars.registerHelper('positiveWarningNegativeSuccess', function(value) {
        if (value > 0) {
          return 'warning';
        } else {
          return 'success';
        }
      });
      return null;
    };

    Pocket.prototype.onSignOutFail = function() {
      return console.log("Could not sign you out.");
    };

    Pocket.prototype.onSignOutSuccess = function() {
      return window.location.reload();
    };

    Pocket.prototype.handleSignInAndSignOut = function() {
      var _this = this;
      hoodieAdmin.account.on('signin', function() {
        _this.isAuthenticated = true;
        return _this.app.render();
      });
      return hoodieAdmin.account.on('signout', function() {
        _this.isAuthenticated = false;
        return _this.app.render();
      });
    };

    Pocket.prototype.loadAppInfo = function() {
      return hoodieAdmin.app.getInfo().pipe(this.setAppInfo);
    };

    Pocket.prototype.setAppInfo = function(info) {
      console.log('info', info);
      return pocket.appInfo = info;
    };

    return Pocket;

  })(Backbone.Events);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.BaseView = (function(_super) {

    __extends(BaseView, _super);

    function BaseView() {
      return BaseView.__super__.constructor.apply(this, arguments);
    }

    BaseView.prototype.helper = function() {
      return console.log("HELPDERP");
    };

    BaseView.prototype.serialize = function() {
      return this;
    };

    BaseView.prototype.beforeRender = function() {
      return this.appInfo = pocket.appInfo;
    };

    BaseView.prototype.afterRender = function() {
      return $('.timeago').timeago();
    };

    BaseView.prototype.makeURLHuman = function(string) {
      var result;
      this.string = string;
      result = this.string.replace(/-/g, ' ');
      return result = result.charAt(0).toUpperCase() + result.slice(1);
    };

    return BaseView;

  })(Backbone.Layout);

}).call(this);

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
      Backbone.history.bind("all", function(route) {
        return _this.handleNavigationStates(Backbone.history.fragment);
      });
      this.loadModules();
      return SidebarView.__super__.afterRender.apply(this, arguments);
    };

    SidebarView.prototype.loadAppName = function() {
      return window.hoodieAdmin.app.getInfo().then(this.renderAppName);
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
      return $.when(window.hoodieAdmin.users.getTotal()).then(function(totalUsers) {
        _this.totalUsers = totalUsers;
        return $('.sidebar .modules .users .name').text(_this.getUserModuleLabel(_this.totalUsers));
      });
    };

    SidebarView.prototype.loadModules = function() {
      var debouncedUserCount;
      debouncedUserCount = _.debounce(this.updateUserCount, 300);
      hoodieAdmin.users.on("change", function(eventName, userObject) {
        return debouncedUserCount(eventName, userObject);
      });
      hoodieAdmin.users.connect();
      return $.when(window.hoodieAdmin.modules.findAll(), window.hoodieAdmin.users.getTotal()).then(this.renderModules);
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
      return this.$el.find('nav ul.modules').html(JST['sidebar-modules'](this));
    };

    return SidebarView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.DashboardView = (function(_super) {

    __extends(DashboardView, _super);

    function DashboardView() {
      return DashboardView.__super__.constructor.apply(this, arguments);
    }

    DashboardView.prototype.template = 'dashboard';

    DashboardView.prototype.emailTransportNotConfigured = function() {
      var isConfigured, _ref, _ref1;
      isConfigured = ((_ref = this.appConfig) != null ? (_ref1 = _ref.email) != null ? _ref1.transport : void 0 : void 0) != null;
      return !isConfigured;
    };

    return DashboardView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.UsersView = (function(_super) {

    __extends(UsersView, _super);

    function UsersView() {
      return UsersView.__super__.constructor.apply(this, arguments);
    }

    UsersView.prototype.template = 'users';

    return UsersView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView = (function(_super) {

    __extends(ModulesView, _super);

    function ModulesView() {
      this.beforeRender = __bind(this.beforeRender, this);
      return ModulesView.__super__.constructor.apply(this, arguments);
    }

    ModulesView.prototype.template = 'module';

    ModulesView.prototype.beforeRender = function() {
      var view;
      this.module.url = this.module.id.replace('worker-', '');
      this.module.cleanName = this.makeURLHuman(this.module.url);
      this.appInfo = pocket.appInfo;
      if (this.getView(".module-content")) {
        this.removeView(".module-content");
      }
      if (this.moduleViewExists(this.module.id)) {
        view = this.getModuleView(this.module.id);
        this.setView(".module-content", view);
        return typeof view.update === "function" ? view.update() : void 0;
      }
    };

    ModulesView.prototype.moduleViewExists = function(name) {
      return Pocket.ModulesView["module-" + name] != null;
    };

    ModulesView.prototype._cachedViews = {};

    ModulesView.prototype.getModuleView = function(name) {
      if (!this._cachedViews[name]) {
        this._cachedViews[name] = new Pocket.ModulesView["module-" + this.module.id];
      }
      return this._cachedViews[name];
    };

    return ModulesView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesBaseView = (function(_super) {

    __extends(ModulesBaseView, _super);

    function ModulesBaseView() {
      return ModulesBaseView.__super__.constructor.apply(this, arguments);
    }

    ModulesBaseView.prototype.afterRender = function() {
      this.$el.find('.formCondition').each(function(index, el) {
        return pocket.handleConditionalFormElements(el, 0);
      });
      return ModulesBaseView.__super__.afterRender.apply(this, arguments);
    };

    return ModulesBaseView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-email-out'] = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.template = 'modules/email-out';

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-logs'] = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.template = 'modules/logs';

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-sharings'] = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.template = 'modules/sharings';

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pocket.UsersView.Router = (function(_super) {

    __extends(Router, _super);

    Router.prototype.routes = {
      "": "default",
      "user/:id": "editUser"
    };

    function Router() {
      this.view = new Pocket.ModulesView['module-users'];
      pocket.app.views.body.setView(".main", this.view);
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype["default"] = function() {
      return this.view.update();
    };

    Router.prototype.editUser = function(id) {
      return this.view.editUser(id);
    };

    return Router;

  })(Backbone.SubRoute);

  Pocket.ModulesView['module-users'] = (function(_super) {

    __extends(_Class, _super);

    _Class.prototype.template = 'modules/users';

    _Class.prototype.sort = void 0;

    _Class.prototype.sortBy = void 0;

    _Class.prototype.sortDirection = void 0;

    _Class.prototype.events = {
      'submit form.config': 'updateConfig',
      'submit form.form-search': 'search',
      'submit form.updatePassword': 'updatePassword',
      'submit form.updateUsername': 'updateUsername',
      'click .addUser button[type="submit"]': 'addUser',
      'click .user a.removeUserPrompt': 'removeUserPrompt',
      'click #confirmUserRemoveModal .removeUser': 'removeUser',
      'click .clearSearch': 'clearSearch'
    };

    function _Class() {
      this._updateModule = __bind(this._updateModule, this);

      this.afterRender = __bind(this.afterRender, this);

      this.beforeRender = __bind(this.beforeRender, this);

      this.removeUser = __bind(this.removeUser, this);

      this.removeUserPrompt = __bind(this.removeUserPrompt, this);

      this.update = __bind(this.update, this);
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.update = function() {
      var _this = this;
      return $.when(hoodieAdmin.users.findAll(), hoodieAdmin.modules.find('users'), hoodieAdmin.config.get()).then(function(users, object, appConfig) {
        var _base;
        _this.totalUsers = users.length;
        _this.users = users;
        _this.config = $.extend(_this._configDefaults(), object.config);
        _this.appConfig = appConfig;
        _this.editableUser = null;
        switch (users.length) {
          case 0:
            _this.resultsDesc = "You have no users yet";
            break;
          case 1:
            _this.resultsDesc = "You have a single user";
            break;
          default:
            _this.resultsDesc = "Currently displaying all " + _this.totalUsers + " users";
        }
        (_base = _this.config).confirmationEmailText || (_base.confirmationEmailText = "Hello {name}, Thanks for signing up!");
        return _this.render();
      });
    };

    _Class.prototype.updateConfig = function(event) {
      event.preventDefault();
      return window.promise = hoodieAdmin.modules.update('module', 'users', this._updateModule);
    };

    _Class.prototype.emailTransportNotConfigured = function() {
      var isConfigured, _ref, _ref1;
      isConfigured = ((_ref = this.appConfig) != null ? (_ref1 = _ref.email) != null ? _ref1.transport : void 0 : void 0) != null;
      return !isConfigured;
    };

    _Class.prototype.addUser = function(event) {
      var $btn, ownerHash, password, username;
      event.preventDefault();
      $btn = $(event.currentTarget);
      username = $btn.closest('form').find('.username').val();
      password = $btn.closest('form').find('.password').val();
      if (username && password) {
        $btn.attr('disabled', 'disabled');
        $btn.siblings('.submitMessage').text("Adding " + username + "…");
        ownerHash = hoodieAdmin.uuid();
        return hoodieAdmin.users.add('user', {
          id: username,
          name: "user/" + username,
          ownerHash: ownerHash,
          database: "user/" + ownerHash,
          signedUpAt: new Date(),
          roles: [],
          password: password
        }).done(this.update).fail(function(data) {
          console.log("could not add user: ", data);
          $btn.attr('disabled', null);
          if (data.statusText === "Conflict") {
            return $btn.siblings('.submitMessage').text("Sorry, '" + username + "' already exists");
          } else {
            return $btn.siblings('.submitMessage').text("Error: " + data.status + " - " + data.responseText);
          }
        });
      } else {
        return $btn.siblings('.submitMessage').text("Please enter a username and a password");
      }
    };

    _Class.prototype.removeUserPrompt = function(event) {
      var id, type;
      event.preventDefault();
      id = $(event.currentTarget).closest("[data-id]").data('id');
      type = $(event.currentTarget).closest("[data-type]").data('type');
      return $('#confirmUserRemoveModal').modal('show').data({
        id: id,
        type: type
      }).find('.modal-body').text('Really remove the user ' + id + '? This cannot be undone!').end().find('.modal-title').text('Remove user ' + id).end();
    };

    _Class.prototype.removeUser = function(event) {
      var id, type,
        _this = this;
      event.preventDefault();
      id = $('#confirmUserRemoveModal').data('id');
      type = $('#confirmUserRemoveModal').data('type');
      return hoodieAdmin.users.remove(type, id).then(function() {
        $('[data-id="' + id + '"]').remove();
        $('#confirmUserRemoveModal').modal('hide');
        return _this.update();
      });
    };

    _Class.prototype.editUser = function(id) {
      var _this = this;
      return $.when(hoodieAdmin.users.find('user', id)).then(function(user) {
        _this.editableUser = user;
        _this.render();
      });
    };

    _Class.prototype.updateUsername = function(event) {
      var $btn, $form, id;
      event.preventDefault();
      id = $(event.currentTarget).closest('form').data('id');
      $form = $(event.currentTarget);
      return $btn = $form.find('[type="submit"]');
    };

    _Class.prototype.updatePassword = function(event) {
      var $btn, $form, id, password;
      event.preventDefault();
      id = $(event.currentTarget).closest('form').data('id');
      $form = $(event.currentTarget);
      $btn = $form.find('[type="submit"]');
      password = $form.find('[name="password"]').val();
      if (password) {
        $btn.attr('disabled', 'disabled');
        $form.find('.submitMessage').text("Updating password");
        return hoodieAdmin.users.update('user', id, {
          password: password
        }).done(function(data) {
          $btn.attr('disabled', null);
          return $form.find('.submitMessage').text("Password updated");
        }).fail(function(data) {
          $btn.attr('disabled', null);
          return $form.find('.submitMessage').text("Error: could not update password");
        });
      } else {
        return $form.find('.submitMessage').text("You didn't change anything.");
      }
    };

    _Class.prototype.search = function(event) {
      var _this = this;
      event.preventDefault();
      this.searchQuery = $('input.search-query', event.currentTarget).val();
      return $.when(hoodieAdmin.users.search(this.searchQuery)).then(function(users) {
        _this.users = users;
        switch (users.length) {
          case 0:
            _this.resultsDesc = "No users matching '" + _this.searchQuery + "'";
            break;
          case 1:
            _this.resultsDesc = "" + users.length + " user matching '" + _this.searchQuery + "'";
            break;
          default:
            _this.resultsDesc = "" + users.length + " users matching '" + _this.searchQuery + "'";
        }
        return _this.render();
      });
    };

    _Class.prototype.clearSearch = function(event) {
      event.preventDefault();
      this.searchQuery = null;
      return this.update();
    };

    _Class.prototype.beforeRender = function() {
      this.sortBy = $('#userList .sort-up, #userList .sort-down').data('sort-by');
      if (this.sortBy) {
        this.sortDirection = 'sort-down';
        if ($('#userList .sort-up').length !== 0) {
          this.sortDirection = 'sort-up';
        }
      } else {
        this.sortBy = "signupDate";
        this.sortDirection = "sort-up";
      }
      return _Class.__super__.beforeRender.apply(this, arguments);
    };

    _Class.prototype.afterRender = function() {
      var sortHeader, userList;
      userList = document.getElementById('userList');
      if (userList) {
        this.sort = new Tablesort(userList);
        sortHeader = $('#userList [data-sort-by="' + this.sortBy + '"]');
        sortHeader.click();
        if (this.sortDirection === 'sort-up') {
          sortHeader.click();
        }
      }
      return _Class.__super__.afterRender.apply(this, arguments);
    };

    _Class.prototype._updateModule = function(module) {
      module.config.confirmationMandatory = this.$el.find('[name=confirmationMandatory]').is(':checked');
      module.config.confirmationEmailFrom = this.$el.find('[name=confirmationEmailFrom]').val();
      module.config.confirmationEmailSubject = this.$el.find('[name=confirmationEmailSubject]').val();
      module.config.confirmationEmailText = this.$el.find('[name=confirmationEmailText]').val();
      return module;
    };

    _Class.prototype._configDefaults = function() {};

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-appconfig'] = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      this.handleSubmitSuccess = __bind(this.handleSubmitSuccess, this);

      this.handleSubmitError = __bind(this.handleSubmitError, this);
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.template = 'modules/appconfig';

    _Class.prototype.events = {
      "submit form.email": "updateConfig"
    };

    _Class.prototype.update = function() {
      var _this = this;
      return hoodieAdmin.config.get().then(function(config) {
        _this.config = config;
        return _this.render();
      });
    };

    _Class.prototype.updateConfig = function(event) {
      var password, promise, username;
      this.$el.find('.submit').attr('disabled', 'disabled');
      event.preventDefault();
      username = this.$el.find('.username').val();
      password = this.$el.find('.password').val();
      this.config = this._getConfigSkeleton();
      this.config.email.transport.auth.user = username;
      this.config.email.transport.auth.pass = password;
      return promise = hoodieAdmin.config.set(this.config).then(this.handleSubmitSuccess, this.handleSubmitError);
    };

    _Class.prototype.handleSubmitError = function(error) {
      console.log("Could not save global mail config");
      console.log(error);
      this.$el.find('.submit').attr('disabled', null);
      return this.$el.find('.submit').siblings('span').text('Could not save global mail config');
    };

    _Class.prototype.handleSubmitSuccess = function() {
      var $message,
        _this = this;
      console.log("Config saved");
      this.$el.find('.submit').attr('disabled', null);
      $message = this.$el.find('.submit').siblings('span');
      return $.when($message.text('Config saved').delay(2000).fadeOut()).done(function() {
        return $message.empty().show();
      });
    };

    _Class.prototype._getConfigSkeleton = function() {
      return {
        email: {
          transport: {
            service: 'GMAIL',
            auth: {
              user: '',
              pass: ''
            }
          }
        }
      };
    };

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.MainView = (function(_super) {

    __extends(MainView, _super);

    function MainView() {
      this.onSignInSuccess = __bind(this.onSignInSuccess, this);

      this.onSignInFail = __bind(this.onSignInFail, this);
      return MainView.__super__.constructor.apply(this, arguments);
    }

    MainView.prototype.views = {
      ".sidebar": new Pocket.SidebarView,
      ".main": new Pocket.DashboardView
    };

    MainView.prototype.events = {
      "submit form.signIn": "signIn"
    };

    MainView.prototype.signIn = function(event) {
      var password;
      this.$el.find('#signIn').attr('disabled', 'disabled');
      event.preventDefault();
      password = this.$el.find('#signInPassword').val();
      return hoodieAdmin.signIn(password).done(this.onSignInSuccess).fail(this.onSignInFail);
    };

    MainView.prototype.onSignInFail = function() {
      $('form.signIn .error').text('Wrong password, please try again');
      return $('#signIn').attr('disabled', null);
    };

    MainView.prototype.onSignInSuccess = function() {
      return window.location.reload();
    };

    return MainView;

  })(Pocket.BaseView);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ApplicationView = (function(_super) {

    __extends(ApplicationView, _super);

    function ApplicationView() {
      return ApplicationView.__super__.constructor.apply(this, arguments);
    }

    ApplicationView.prototype.events = {
      "click a": "handleLinks"
    };

    ApplicationView.prototype.views = {
      "body": new Pocket.MainView
    };

    ApplicationView.prototype.initialize = function() {
      ApplicationView.__super__.initialize.apply(this, arguments);
      this.setElement($('html'));
      return this.render();
    };

    ApplicationView.prototype.handleLinks = function(event) {
      var path;
      path = $(event.target).attr('href');
      if (/\.pdf$/.test(path)) {
        return true;
      }
      if (/^\/[^\/]/.test(path)) {
        pocket.router.navigate(path.substr(1), true);
        return false;
      }
    };

    ApplicationView.prototype.beforeRender = function() {
      if (pocket.isAuthenticated) {
        this.views.body.template = 'main';
      } else {
        this.views.body.template = 'signin';
      }
      console.log('@views.body.template', this.views.body.template);
      return ApplicationView.__super__.beforeRender.apply(this, arguments);
    };

    return ApplicationView;

  })(Pocket.BaseView);

}).call(this);

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
      "modules/:moduleName": "modules",
      "modules/:moduleName/*subroute": "modules"
    };

    Router.prototype.dashboard = function() {
      var view;
      console.log("dashboard: ");
      view = new Pocket.DashboardView;
      pocket.app.views.body.setView(".main", view);
      return $.when(hoodieAdmin.app.getStats(1358610679), hoodieAdmin.config.get()).then(function(stats, appConfig) {
        view.stats = stats;
        view.appConfig = appConfig;
        return view.render();
      });
    };

    Router.prototype.modules = function(moduleName, subroute) {
      var _this = this;
      console.log("modules: ", moduleName, subroute);
      if (!Pocket.Routers) {
        Pocket.Routers = {};
      }
      return window.hoodieAdmin.modules.find(moduleName).then(function(module) {
        var moduleViewName, view, _ref;
        moduleViewName = _this.capitaliseFirstLetter(moduleName) + "View";
        if (!Pocket.Routers[moduleViewName] && ((_ref = Pocket[moduleViewName]) != null ? _ref.Router : void 0)) {
          return Pocket.Routers[moduleViewName] = new Pocket[moduleViewName].Router('modules/' + moduleName, {
            createTrailingSlashRoutes: true
          });
        } else {
          view = new Pocket.ModulesView;
          pocket.app.views.body.setView(".main", view);
          view.module = module;
          return view.render();
        }
      });
    };

    Router.prototype.capitaliseFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return Router;

  })(Backbone.Router);

}).call(this);

this["JST"] = this["JST"] || {};

this["JST"]["dashboard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"alert alert-error\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>\n        <a href=\"/modules/appconfig\"><strong>Appconfig:</strong><br>\n        Emails cannot be sent, please configure email transport.</a>\n      </li>\n    </ul>\n  </div>\n  ";
  }

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">New events for "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " since your last visit <span class=\"timeago\" title=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.convertTimestampToISO),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since), options) : helperMissing.call(depth0, "convertTimestampToISO", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since), options)))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></h2>\n\n  ";
  stack2 = helpers['if'].call(depth0, depth0.emailTransportNotConfigured, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  <div class=\"alert alert-info\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>Module Signup confirmation reports: New user confirmed! (about 6 hours ago)</li>\n    </ul>\n  </div>\n\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups), options)))
    + "\">\n      <span>New signups/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveWarningNegativeSuccess),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions), options) : helperMissing.call(depth0, "positiveWarningNegativeSuccess", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions), options)))
    + "\">\n      <span>Account deletions/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth), options)))
    + "\">\n      <span>Growth/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</h1>\n    </div>\n  </div>\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel info span4\">\n      <span>Total Users</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.users_total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel info span4\">\n      <span>Active Users / past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.users_active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active), options)))
    + "\">\n      <span>Activity / past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</h1>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  });

this["JST"]["layouts/application"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"topbar\">\n  <a href=\"#\" class=\"signOut\">Sign out</a>\n</div>\n<div class=\"sidebar\">\n  sidebar\n</div>\n<div class=\"main\">\n  main\n</div>";
  });

this["JST"]["main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<a href=\"#\" class=\"signOut\">Sign out</a>\n\n<div class=\"sidebar\">\n\n</div>\n<div class=\"main\">\n\n</div>";
  });

this["JST"]["module"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.cleanName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n\n  <div class=\"module-content\"></div>\n</div>\n";
  return buffer;
  });

this["JST"]["modules/appconfig"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"module\">\n  <legend>Email Settings</legend>\n  <span class=\"description\">Set up all outgoing email from this Hoodie app</span>\n  <form class=\"email form-horizontal\" action=\"\">\n    <section>\n      <div class=\"control-group\">\n        <label>Service</label>\n        <div class=\"controls\">\n          <select>\n            <option>gMail</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label>Username</label>\n        <div class=\"controls\">\n          <input class=\"username\" type=\"email\" placeholder=\"me@gmail.com\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.email)),stack1 == null || stack1 === false ? stack1 : stack1.transport)),stack1 == null || stack1 === false ? stack1 : stack1.auth)),stack1 == null || stack1 === false ? stack1 : stack1.user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label>Password</label>\n        <div class=\"controls\">\n          <input class=\"password\" type=\"password\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.email)),stack1 == null || stack1 === false ? stack1 : stack1.transport)),stack1 == null || stack1 === false ? stack1 : stack1.auth)),stack1 == null || stack1 === false ? stack1 : stack1.pass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n\n    </section>\n    <section>\n      <label></label>\n      <div class=\"controls\">\n        <button class=\"submit btn\" type=\"submit\">Submit</button>\n        <span class=\"submitMessage\"></span>\n      </div>\n    </section>\n  </form>\n</div>\n\n";
  return buffer;
  });

this["JST"]["modules/email-out"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"module\" id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <legend>Settings</legend>\n\n  <span class=\"description\">E-Mail out is in charge of all outgoing mail from this Hoodie instance</span>\n  <form action=\"\">\n    <section>\n      <div class=\"formLabel\">\n        <label>From address</label>\n      </div>\n      <div class=\"form\">\n        <input type=\"email\" placeholder=\"";
  if (stack2 = helpers.defaultReplyMailAddress) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.defaultReplyMailAddress; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" required>\n        <span class=\"note\">From address for all of your app's emails.</span>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;
  });

this["JST"]["modules/logs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/logs.hbs\n";
  });

this["JST"]["modules/sharings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/sharings.hbs\n";
  });

this["JST"]["modules/users"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['with'].call(depth0, depth0.editableUser, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <legend>Edit user '";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'</legend>\n    <form class=\"updateUsername form-horizontal\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <section class=\"username noBorder\">\n        <div class=\"control-group\">\n          <label>\n            New username\n          </label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"username\" value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-oldusername=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Username cannot be empty\" disabled>\n            <span class=\"note\">Changing the username isn't implemented yet, sorry.</span>\n          </div>\n        </div>\n      </section>\n      <section>\n        <div class=\"control-group\">\n          <label>\n            &nbsp;\n          </label>\n          <div class=\"controls\">\n            <button class=\"btn\" type=\"submit\" disabled>Update username</button>\n            <span class=\"submitMessage\"></span>\n          </div>\n        </div>\n      </section>\n    </form>\n    <form class=\"updatePassword form-horizontal\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <section class=\"password\">\n        <div class=\"control-group\">\n          <label>\n            New password\n          </label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"password\" value=\"\" placeholder=\"Password cannot be empty\">\n          </div>\n        </div>\n      </section>\n      <section>\n        <div class=\"control-group\">\n          <label>\n            &nbsp;\n          </label>\n          <div class=\"controls\">\n            <button class=\"btn\" type=\"submit\">Update password</button>\n            <span class=\"submitMessage\"></span>\n          </div>\n        </div>\n      </section>\n    </form>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <legend>Settings</legend>\n\n  <span class=\"description\">Configure whether users must confirm their signup and if yes, set up the email they will receive for this purpose.</span>\n\n  <form class=\"config form-horizontal\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0.emailTransportNotConfigured, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </form>\n</div>\n\n<hr>\n\n<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <fieldset class=\"toggle\">\n    <legend class=\"toggler\">Add user</legend>\n    <div class=\"togglee\">\n      <legend>Add user</legend>\n      <form class=\"form-horizontal addUser\">\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              Username\n            </label>\n            <div class=\"controls\">\n              <input type=\"text\" name=\"username\" class=\"username\" value=\"\" placeholder=\"username\">\n            </div>\n          </div>\n        </section>\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              Password\n            </label>\n            <div class=\"controls\">\n              <input type=\"text\" name=\"password\" class=\"password\" value=\"\" placeholder=\"\">\n            </div>\n          </div>\n        </section>\n        <section>\n          <div class=\"control-group\">\n            <label>\n              &nbsp;\n            </label>\n            <div class=\"controls\">\n              <button class=\"btn\" type=\"submit\">Add user</button>\n              <span class=\"submitMessage\"></span>\n            </div>\n          </div>\n        </section>\n      </form>\n    </div>\n  </fieldset>\n  <div class=\"userSearch group\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\" placeholder=\"Username\"";
  stack1 = helpers['if'].call(depth0, depth0.searchQuery, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n    ";
  stack1 = helpers['if'].call(depth0, depth0.searchQuery, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">";
  if (stack1 = helpers.resultsDesc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.resultsDesc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    <p class=\"currentSearchMetrics muted\">Showing "
    + escapeExpression(((stack1 = ((stack1 = depth0.users),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " of ";
  if (stack2 = helpers.totalUsers) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.totalUsers; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " users</p>\n  </div>\n  ";
  stack2 = helpers['if'].call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  stack2 = helpers['if'].call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "\n    <section>\n      <div class=\"control-group\">\n        <label>\n          Signup confirmation\n        </label>\n        <div class=\"controls\">\n          <span class=\"note\">Email needs to be configured in <a href=\"/modules/appconfig\">Appconfig</a> before enabling signup confirmation</span>\n        </div>\n      </div>\n    </section>\n    ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <section>\n      <div class=\"control-group\">\n        <label>\n          Signup confirmation\n        </label>\n        <div class=\"controls\">\n          <label class=\"checkbox\">\n            <input type=\"checkbox\" name=\"confirmationMandatory\" class=\"formCondition\" data-conditions=\"true:.confirmationOptions\"> is mandatory\n          </label>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          From address\n        </label>\n        <div class=\"controls\">\n          <input type=\"email\" name=\"confirmationEmailFrom\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailFrom)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"";
  if (stack2 = helpers.defaultReplyMailAddress) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.defaultReplyMailAddress; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" required>\n          <span class=\"note\">From address for all of your app's emails.</span>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          Subject line\n        </label>\n        <div class=\"controls\">\n          <input type=\"text\" name=\"confirmationEmailSubject\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailSubject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"Please confirm your signup at "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          Body\n        </label>\n        <div class=\"controls\">\n          <textarea rows=\"4\" name=\"confirmationEmailText\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </div>\n      </div>\n    </section>\n\n    <section>\n      <div class=\"control-group\">\n        <label>\n          &nbsp;\n        </label>\n        <div class=\"controls\">\n          <button class=\"btn\" type=\"submit\">Update</button>\n        </div>\n      </div>\n    </section>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " value=\"";
  if (stack1 = helpers.searchQuery) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.searchQuery; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n    <button class=\"btn clearSearch\">Clear search</button>\n    ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table id=\"userList\" class=\"table users\">\n    <thead>\n      <tr>\n        <th data-sort-by=\"username\">Username</th>\n        <th data-sort-by=\"lastSeen\">Last seen</th>\n        <th data-sort-by=\"signupDate\">Signup date</th>\n        <th data-sort-by=\"state\">State</th>\n        <th class=\"no-sort\"></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = helpers.each.call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n      <tr data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"user\">\n        <td>";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.lastLogin) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td data-sort=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.convertISOToTimestamp),stack1 ? stack1.call(depth0, depth0.signedUpAt, options) : helperMissing.call(depth0, "convertISOToTimestamp", depth0.signedUpAt, options)))
    + "\" class=\"timeago\" title=\"";
  if (stack2 = helpers.signedUpAt) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.signedUpAt; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">";
  if (stack2 = helpers.signedUpAt) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.signedUpAt; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n        <td>\n          ";
  stack2 = helpers['if'].call(depth0, depth0.$error, {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </td>\n        <td class=\"no-sort\">\n          <a href=\"#modules/users/user/";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"edit\">edit</a> /\n          <a href=\"#\" class=\"removeUserPrompt\">delete</a> /\n          <a href=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkToFutonUser),stack1 ? stack1.call(depth0, depth0.name, options) : helperMissing.call(depth0, "linkToFutonUser", depth0.name, options)))
    + "\">futon</a>\n        </td>\n      </tr>\n      ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            <div class=\"inTableError\">\n              <span class=\"error\">";
  if (stack1 = helpers.$state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.$state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span><i class=\"icon-warning-sign\"></i>\n              <div class=\"errorTooltip\">\n                <i class=\"icon-warning-sign\"></i><strong>"
    + escapeExpression(((stack1 = ((stack1 = depth0.$error),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n                <p>"
    + escapeExpression(((stack1 = ((stack1 = depth0.$error),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                <p><a href=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.linkToFutonUser),stack1 ? stack1.call(depth0, depth0.name, options) : helperMissing.call(depth0, "linkToFutonUser", depth0.name, options)))
    + "\">";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "'s user page in Futon</a></p>\n              </div>\n            </div>\n          ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, depth0.$state, {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              ";
  if (stack1 = helpers.$state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.$state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\n              <span class=\"warn\">unconfirmed</span><i class=\"icon-question-sign\"></i>\n            ";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">";
  if (stack1 = helpers.resultsDesc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.resultsDesc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    <p class=\"currentSearchMetrics muted\">Showing "
    + escapeExpression(((stack1 = ((stack1 = depth0.users),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " of ";
  if (stack2 = helpers.totalUsers) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.totalUsers; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " users</p>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"module content centered\" id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  ";
  stack2 = helpers['if'].call(depth0, depth0.editableUser, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n\n<div id=\"confirmUserRemoveModal\" class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n    <h3 class=\"modal-title\"></h3>\n  </div>\n  <div class=\"modal-body\">\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"closeModal btn\" data-dismiss=\"modal\" aria-hidden=\"true\">Cancel</button>\n    <button class=\"removeUser btn btn-danger\">Remove user</button>\n  </div>\n</div>\n";
  return buffer;
  });

this["JST"]["sidebar-modules"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n  <a href=\"/#modules/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <span class=\"name\">";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    <span class=\"badge ";
  if (stack1 = helpers.badgeStatus) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.badgeStatus; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.messageAmount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.messageAmount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </a>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.modules, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["JST"]["sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<header>\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <div class=\"appName\"><div><a href=\"/#\"></a></div></div>\n</header>\n<nav>\n  <ul class=\"modules\"></ul>\n</nav>\n";
  });

this["JST"]["signin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"signInContainer\">\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <h2 class=\"top\">";
  if (stack1 = helpers['a']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['a']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Welcome to "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s Pocket</h2>\n  <form class=\"signIn form-horizontal\">\n    <section class=\"noBorder\">\n      <span class=\"error\"></span>\n      <div class=\"control-group\">\n        <label>Admin password</label>\n        <div class=\"controls\">\n          <input id=\"signInPassword\" type=\"password\" autofocus>\n        </div>\n      </div>\n      <div class=\"control-group\">\n        <label></label>\n        <div class=\"controls\">\n          <button id=\"signIn\" type=\"submit\" class=\"btn\">Sign in!</button>\n        </div>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;
  });

this["JST"]["users"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.lastLogin) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td class=\"timeago\" title=\"";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>resend / new</td>\n        <td>edit / delete</td>\n      </tr>\n      ";
  return buffer;
  }

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <div class=\"userSearch\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"tableStatus\" >\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Username</th>\n        <th>Last seen</th>\n        <th>Signup date</th>\n        <th>State</th>\n        <th>Password</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = helpers.each.call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n</div>\n";
  return buffer;
  });