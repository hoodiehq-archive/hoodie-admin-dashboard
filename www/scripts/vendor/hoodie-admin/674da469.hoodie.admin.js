(function() {

  Hoodie.Admin = (function() {

    function Admin(hoodie) {
      var _this = this;
      this.hoodie = hoodie;
      this.users = new Hoodie.AdminUsers(this.hoodie, this);
      this.config = new Hoodie.AdminConfig(this.hoodie, this);
      this.logs = new Hoodie.AdminLogs(this.hoodie, this);
      this.modules = new Hoodie.AdminModules(this.hoodie, this);
      this.hoodie.account._userKey = function() {
        return 'admin';
      };
      hoodie = this.hoodie;
      this.hoodie.account._handleSignInSuccess = function(response) {
        var defer, username;
        defer = hoodie.defer();
        username = 'admin';
        hoodie.account._authenticated = true;
        hoodie.account._setUsername(username);
        hoodie.config.set('_remote.sync', false);
        hoodie.account.trigger('signin', username);
        return defer.resolve(username, username);
      };
      this.hoodie.remote.sync = function() {
        return _this.hoodie.resolveWith();
      };
      this.hoodie.account._handleSignInSuccess.bind(this.hoodie.account);
    }

    Admin.prototype.on = function(event, callback) {};

    Admin.prototype.authenticate = function(password) {
      if (this.hoodie.account.username !== 'admin') {
        return this.hoodie.rejectWith("Not signed in as admin.");
      }
      return this.hoodie.account.authenticate();
    };

    Admin.prototype.signIn = function(password) {
      var username;
      username = "admin";
      return this.hoodie.account.signIn(username, password);
    };

    Admin.prototype.signOut = function() {
      return this.hoodie.account.signOut();
    };

    Admin.prototype.app = function() {
      var info;
      info = {
        name: "minutes.io"
      };
      return this.hoodie.resolveWith(info);
    };

    Admin.prototype.stats = function(since) {
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

    return Admin;

  })();

  Hoodie.extend("admin", Hoodie.Admin);

}).call(this);
