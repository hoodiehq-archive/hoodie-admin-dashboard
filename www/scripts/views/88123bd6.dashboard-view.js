(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.DashboardView = (function(_super) {

    __extends(DashboardView, _super);

    function DashboardView() {
      this.onSignInFail = __bind(this.onSignInFail, this);

      this.onSignInSuccess = __bind(this.onSignInSuccess, this);

      this.renderSignin = __bind(this.renderSignin, this);

      this.render = __bind(this.render, this);
      return DashboardView.__super__.constructor.apply(this, arguments);
    }

    DashboardView.prototype.template = 'dashboard';

    DashboardView.prototype.initialize = function() {
      DashboardView.__super__.initialize.apply(this, arguments);
      this.setElement($('.main'));
      return this.appInfo = pocket.appInfo;
    };

    DashboardView.prototype.active = function() {
      if (pocket.isAuthenticated) {
        return this.loadStats();
      } else {
        return this.renderSignin();
      }
    };

    DashboardView.prototype.loadStats = function() {
      return hoodie.admin.stats(1358610679).then(this.render);
    };

    DashboardView.prototype.render = function(stats) {
      this.stats = stats;
      this.$el.html(Handlebars.VM.template(JST[this.template])(this));
      return DashboardView.__super__.render.apply(this, arguments);
    };

    DashboardView.prototype.renderSignin = function() {
      var _this = this;
      this.$el.html(Handlebars.VM.template(JST["signin"])(this));
      return $('form.signIn').submit(function(event) {
        var password;
        $('#signIn').attr('disabled', 'disabled');
        event.preventDefault();
        password = $('#signInPassword').val();
        return hoodie.admin.signIn(password).done(_this.onSignInSuccess).fail(_this.onSignInFail);
      });
    };

    DashboardView.prototype.onSignInSuccess = function() {
      return window.location.reload();
    };

    DashboardView.prototype.onSignInFail = function() {
      $('form.signIn .error').text('Wrong password, please try again');
      return $('#signIn').attr('disabled', null);
    };

    return DashboardView;

  })(pocket.Views.BaseView);

}).call(this);
