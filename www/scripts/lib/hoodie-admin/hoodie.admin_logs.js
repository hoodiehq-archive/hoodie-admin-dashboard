(function() {

  Hoodie.AdminLogs = (function() {

    function AdminLogs(hoodie, admin) {
      this.hoodie = hoodie;
      this.admin = admin;
    }

    AdminLogs.prototype.findAll = function() {
      return this.hoodie.resolveWith([]);
    };

    return AdminLogs;

  })();

}).call(this);
