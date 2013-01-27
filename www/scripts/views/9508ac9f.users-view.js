(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.UsersView = (function(_super) {

    __extends(UsersView, _super);

    function UsersView() {
      this.render = __bind(this.render, this);
      return UsersView.__super__.constructor.apply(this, arguments);
    }

    UsersView.prototype.template = 'users';

    UsersView.prototype.initialize = function() {
      UsersView.__super__.initialize.apply(this, arguments);
      return this.setElement($('.main'));
    };

    UsersView.prototype.active = function() {
      if (pocket.isAuthenticated) {
        return this.loadUsers();
      } else {
        return pocket.router.navigate('/');
      }
    };

    UsersView.prototype.loadUsers = function() {
      return window.hoodie.admin.users.store.findAll().then(this.render);
    };

    UsersView.prototype.render = function(users) {
      this.users = users;
      this.$el.html(Handlebars.VM.template(JST[this.template])(this));
      return UsersView.__super__.render.apply(this, arguments);
    };

    return UsersView;

  })(pocket.Views.BaseView);

}).call(this);
