(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Hoodie.AdminModules = (function() {

    function AdminModules(hoodie, admin) {
      this.hoodie = hoodie;
      this.admin = admin;
      this.findAll = __bind(this.findAll, this);

    }

    AdminModules.prototype.findAll = function(options) {
      var modules;
      modules = [
        {
          name: "worker-email-out",
          status: "success"
        }, {
          name: "worker-user-databases",
          status: "success"
        }, {
          name: "worker-email-signup-confirmation",
          status: "error",
          messages: ["Dummy error message", "Dummy error message"]
        }, {
          name: "worker-password-reset",
          status: "success"
        }, {
          name: "worker-username-change",
          status: "warning"
        }, {
          name: "worker-log",
          status: "error",
          messages: ["Dummy error message", "Dummy error message"]
        }
      ];
      return this.hoodie.resolveWith(modules);
    };

    return AdminModules;

  })();

}).call(this);
