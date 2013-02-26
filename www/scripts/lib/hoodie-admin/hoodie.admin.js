(function() {

  Hoodie.Admin = (function() {

    function Admin(hoodie) {
      this.hoodie = hoodie;
      this.users = new Hoodie.AdminUsers(this.hoodie, this);
      this.config = new Hoodie.AdminConfig(this.hoodie, this);
      this.logs = new Hoodie.AdminLogs(this.hoodie, this);
      this.modules = new Hoodie.AdminModules(this.hoodie, this);
      this.hoodie.account._userKey = function() {
        return 'admin';
      };
      this.hoodie.remote.pull = function() {};
      this.hoodie.remote.push = function() {};
      this.hoodie.remote.sync = function() {};
      this.hoodie.account._handleSignInSuccess = function(response) {
        var defer, username;
        defer = hoodie.defer();
        username = 'admin';
        hoodie.account._authenticated = true;
        hoodie.account._setUsername(username);
        hoodie.account.trigger('signin', username);
        return defer.resolve(username, username);
      };
      this.patchHoodie();
    }

    Admin.prototype.patchHoodie = function(event, callback) {
      return Hoodie.LocalStore.prototype.isPersistent = function() {
        return false;
      };
    };

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

    Admin.prototype.getAppInfo = function() {
      var defer, info;
      defer = this.hoodie.defer();
      info = {
        name: "minutes.io"
      };
      window.setTimeout(function() {
        return defer.resolve(info);
      });
      return defer.promise();
    };

    Admin.prototype.getStats = function(since) {
      var defer, key, stats;
      defer = this.hoodie.defer();
      stats = {
        signups: 12,
        account_deletions: 3,
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
      window.setTimeout(function() {
        return defer.resolve(stats);
      });
      return defer.promise();
    };

    Admin.prototype.getConfig = function() {
      return this.modules.find("appconfig").pipe(function(module) {
        return module.config;
      });
    };

    Admin.prototype.setConfig = function(config) {
      var promise, updateFunction;
      if (config == null) {
        config = {};
      }
      updateFunction = function(module) {
        module.config = config;
        return module;
      };
      promise = this.modules.update("module", "appconfig", updateFunction);
      return promise;
    };

    return Admin;

  })();

}).call(this);
