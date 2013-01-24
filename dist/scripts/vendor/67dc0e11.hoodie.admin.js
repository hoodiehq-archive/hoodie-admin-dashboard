(function() {
  var HoodieAdminClass;

  HoodieAdminClass = (function() {

    function HoodieAdminClass(hoodie) {
      var _this = this;
      this.hoodie = hoodie;
      this.app = function() {
        var info;
        info = {
          name: "minutes.io"
        };
        return this.hoodie.resolveWith(info);
      };
      this.users = {
        total: function() {
          return _this.hoodie.resolveWith(4211);
        },
        findAll: function(options) {
          var users;
          users = [
            {
              name: "hello@alex.com",
              lastLogin: "2013-01-21T16:07:20.574Z",
              signedUpAt: "2013-01-18T16:07:20.574Z",
              state: "confirmed"
            }, {
              name: "hello@gregor.com",
              lastLogin: "2013-01-16T16:07:20.574Z",
              signedUpAt: "2013-01-15T16:07:20.574Z",
              state: "new"
            }, {
              name: "hello@jan.com",
              lastLogin: "2013-01-01T16:07:20.574Z",
              signedUpAt: "2012-12-20T16:07:20.574Z",
              state: "deleted"
            }
          ];
          return _this.hoodie.resolveWith(users);
        },
        search: function() {}
      };
      this.config = {
        get: function() {},
        set: function() {}
      };
      this.on = function() {};
      this.logs = {
        findAll: function() {}
      };
      this.stats = function(since) {
        var key, stats;
        stats = {
          signups: 12,
          account_deletions: 1,
          users_active: 1302,
          users_total: 4211,
          growth: 0.04,
          active: -0.02,
          since: since
        };
        if (!since) {
          for (key in stats) {
            stats[key] = stats[key] * 17;
          }
        }
        return this.hoodie.resolveWith(stats);
      };
      this.modules = {
        findAll: function(options) {
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
          return _this.hoodie.resolveWith(modules);
        }
      };
    }

    return HoodieAdminClass;

  })();

  Hoodie.extend("admin", HoodieAdminClass);

}).call(this);
