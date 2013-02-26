(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-users'] = (function(_super) {

    __extends(_Class, _super);

    _Class.prototype.template = 'modules/users';

    _Class.prototype.events = {
      'submit form.config': 'updateConfig',
      'submit form.form-search': 'search'
    };

    function _Class() {
      this._updateModule = __bind(this._updateModule, this);
      this.registerListeners();
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.registerListeners = function() {
      var _this = this;
      return $("body").on("click", '.addTestUsers button[type="submit"]', function(event) {
        var $btn, users;
        event.preventDefault();
        $btn = $(event.currentTarget);
        users = parseInt($btn.closest('form').find('.amountOfTestUsers').val());
        if (_.isNumber(users) && users > 0) {
          $btn.attr('disabled', 'disabled');
          if (users === 1) {
            $btn.siblings('.submitMessage').text("Adding a test user…");
          } else {
            $btn.siblings('.submitMessage').text("Adding " + users + " test users…");
          }
          return $.when(hoodie.admin.users.addTestUsers(users)).then(function() {
            console.log("WTF!");
            return _this.update();
          });
        } else {
          return $(btn).siblings('.submitMessage').text("That's not a number");
        }
      });
    };

    _Class.prototype.update = function() {
      var _this = this;
      return $.when(hoodie.admin.users.findAll(), hoodie.admin.modules.find('users'), hoodie.admin.getConfig()).then(function(users, object, appConfig) {
        var _base;
        _this.totalUsers = users.length;
        _this.users = users;
        _this.config = $.extend(_this._configDefaults(), object.config);
        _this.appConfig = appConfig;
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
        (_base = _this.config).confirmationEmailText || (_base.confirmationEmailText = "Hello {name}! Thanks for signing up with " + appInfo.name);
        return _this.render();
      });
    };

    _Class.prototype.updateConfig = function(event) {
      event.preventDefault();
      return window.promise = hoodie.admin.modules.update('module', 'users', this._updateModule);
    };

    _Class.prototype.emailTransportNotConfigured = function() {
      var isConfigured, _ref, _ref1;
      isConfigured = ((_ref = this.appConfig) != null ? (_ref1 = _ref.email) != null ? _ref1.transport : void 0 : void 0) != null;
      return !isConfigured;
    };

    _Class.prototype.search = function(event) {
      var searchQuery,
        _this = this;
      searchQuery = $('input.search-query', event.currentTarget).val();
      return $.when(hoodie.admin.users.search(searchQuery)).then(function(users) {
        _this.users = users;
        switch (users.length) {
          case 0:
            _this.resultsDesc = "No users matching '" + searchQuery + "'";
            break;
          case 1:
            _this.resultsDesc = "" + users.length + " user matching '" + searchQuery + "'";
            break;
          default:
            _this.resultsDesc = "" + users.length + " users matching '" + searchQuery + "'";
        }
        return _this.render();
      });
    };

    _Class.prototype.beforeRender = function() {
      console.log("users", this.users);
      return _Class.__super__.beforeRender.apply(this, arguments);
    };

    _Class.prototype._updateModule = function(module) {
      module.config.confirmationMandatory = this.$el.find('[name=confirmationMandatory]').is(':checked');
      module.config.confirmationEmailFrom = this.$el.find('[name=confirmationEmailFrom]').val();
      module.config.confirmationEmailSubject = this.$el.find('[name=confirmationEmailSubject]').val();
      module.config.confirmationEmailText = this.$el.find('[name=confirmationEmailText]').val();
      return module;
    };

    _Class.prototype._configDefaults = function() {
      return {
        confirmationEmailText: "Hello {name}! Thanks for signing up with " + this.appInfo.name
      };
    };

    return _Class;

  })(Pocket.ModulesBaseView);

}).call(this);
