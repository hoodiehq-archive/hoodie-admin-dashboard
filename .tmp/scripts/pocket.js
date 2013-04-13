(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Pocket = (function(_super) {

    __extends(Pocket, _super);

    function Pocket() {
      this.setAppInfo = __bind(this.setAppInfo, this);

      this.loadAppInfo = __bind(this.loadAppInfo, this);

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
      return hoodie.admin.authenticate().then(this.handleAuthenticateSuccess, this.handleAuthenticateError);
    };

    Pocket.prototype.handleAuthenticateSuccess = function() {
      this.isAuthenticated = true;
      this.$el.addClass('authenticated');
      return hoodie.resolveWith(this.isAuthenticated);
    };

    Pocket.prototype.handleAuthenticateError = function() {
      this.isAuthenticated = false;
      return hoodie.resolveWith(this.isAuthenticated);
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
        return hoodie.admin.signOut().done(_this.onSignOutSuccess).fail(_this.onSignOutFail);
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

    Pocket.prototype.handleSignInAndSignOut = function() {
      var _this = this;
      hoodie.account.on('signin', function() {
        _this.isAuthenticated = true;
        return _this.app.render();
      });
      return hoodie.account.on('signout', function() {
        _this.isAuthenticated = false;
        return _this.app.render();
      });
    };

    Pocket.prototype.loadAppInfo = function() {
      return hoodie.admin.app.getInfo().pipe(this.setAppInfo);
    };

    Pocket.prototype.setAppInfo = function(info) {
      console.log('info', info);
      return pocket.appInfo = info;
    };

    return Pocket;

  })(Backbone.Events);

}).call(this);
