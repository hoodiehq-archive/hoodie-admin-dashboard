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
      return hoodie.admin.getConfig().then(function(config) {
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
      return promise = hoodie.admin.setConfig(this.config).then(this.handleSubmitSuccess, this.handleSubmitError);
    };

    _Class.prototype.handleSubmitError = function(error) {
      console.log("Could not save global mail config");
      console.log(error);
      return this.$el.find('.submit').attr('disabled', null);
    };

    _Class.prototype.handleSubmitSuccess = function() {
      console.log("Config saved");
      return this.$el.find('.submit').attr('disabled', null);
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
