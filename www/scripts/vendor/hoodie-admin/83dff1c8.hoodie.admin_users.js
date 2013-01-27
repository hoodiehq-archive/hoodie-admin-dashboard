(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hoodie.AdminUsers = (function(_super) {

    __extends(AdminUsers, _super);

    AdminUsers.prototype.name = '_users';

    function AdminUsers(hoodie, admin) {
      this.hoodie = hoodie;
      this.admin = admin;
      this.total = __bind(this.total, this);

      AdminUsers.__super__.constructor.apply(this, arguments);
    }

    AdminUsers.prototype.total = function() {
      return this.hoodie.resolveWith(4211);
    };

    AdminUsers.prototype.search = function() {
      return this.hoodie.resolveWith(4211);
    };

    return AdminUsers;

  })(Hoodie.Remote);

}).call(this);
