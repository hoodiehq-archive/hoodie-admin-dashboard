(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView['module-users'] = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      this._updateModule = __bind(this._updateModule, this);
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.template = 'modules/users';

    _Class.prototype.events = {
      'submit form.config': 'updateConfig'
    };

    _Class.prototype.update = function() {
      var _this = this;
      return $.when(hoodie.admin.users.store.findAll(), hoodie.admin.modules.store.find('module', 'users'), hoodie.admin.getConfig()).then(function(users, object, appConfig) {
        var _base;
        _this.users = users;
        _this.config = $.extend(_this._configDefaults(), object.config);
        _this.appConfig = appConfig;
        (_base = _this.config).confirmationEmailText || (_base.confirmationEmailText = "Hello {name}! Thanks for signing up with " + appInfo.name);
        return _this.render();
      });
    };

    _Class.prototype.updateConfig = function(event) {
      event.preventDefault();
      return window.promise = hoodie.admin.modules.store.update('module', 'users', this._updateModule);
    };

    _Class.prototype.emailTransportNotConfigured = function() {
      var isConfigured, _ref, _ref1;
      isConfigured = ((_ref = this.appConfig) != null ? (_ref1 = _ref.email) != null ? _ref1.transport : void 0 : void 0) != null;
      return !isConfigured;
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
