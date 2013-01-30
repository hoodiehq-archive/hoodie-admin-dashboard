(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.MainView = (function(_super) {

    __extends(MainView, _super);

    function MainView() {
      this.handleSignInError = __bind(this.handleSignInError, this);
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
      return hoodie.admin.signIn(password).fail(this.handleSignInError);
    };

    MainView.prototype.handleSignInError = function() {
      $('form.signIn .error').text('Wrong password, please try again');
      return $('#signIn').attr('disabled', null);
    };

    return MainView;

  })(Pocket.BaseView);

}).call(this);
