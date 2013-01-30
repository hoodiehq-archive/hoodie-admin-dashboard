(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hoodie.AdminUsers = (function(_super) {

    __extends(AdminUsers, _super);

    AdminUsers.prototype.Store = Hoodie.AdminUsersStore;

    AdminUsers.prototype.name = '_users';

    function AdminUsers(hoodie, admin) {
      this.hoodie = hoodie;
      this.admin = admin;
      AdminUsers.__super__.constructor.apply(this, arguments);
    }

    return AdminUsers;

  })(Hoodie.Remote);

}).call(this);
