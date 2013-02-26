(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hoodie.AdminUsers = (function(_super) {

    __extends(AdminUsers, _super);

    AdminUsers.prototype.name = '_users';

    function AdminUsers(hoodie, admin) {
      this._mapDocsFromFindAll = __bind(this._mapDocsFromFindAll, this);
      this.hoodie = hoodie;
      this.admin = admin;
      AdminUsers.__super__.constructor.apply(this, arguments);
    }

    AdminUsers.prototype.addTestUser = function(email) {
      var baseUrl, hash, testHoodieUser;
      baseUrl = hoodie.baseUrl;
      hash = "test-" + (hoodie.uuid(5));
      testHoodieUser = new Hoodie(baseUrl.replace(/\bapi\./, "" + hash + ".api."));
      testHoodieUser.account.ownerHash = hash;
      if (!email) {
        email = "" + testHoodieUser.account.ownerHash + "@example.com";
      }
      return testHoodieUser.account.signUp(email, 'secret');
    };

    AdminUsers.prototype.addTestUsers = function(nr) {
      var i, promises, timestamp;
      if (nr == null) {
        nr = 1;
      }
      timestamp = (new Date).getTime();
      promises = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; 1 <= nr ? _i <= nr : _i >= nr; i = 1 <= nr ? ++_i : --_i) {
          _results.push(this.addTestUser());
        }
        return _results;
      }).call(this);
      return $.when.apply($, promises);
    };

    AdminUsers.prototype.removeAllTestUsers = function() {
      return this.hoodie.rejectWith({
        error: "not yet implemented"
      });
    };

    AdminUsers.prototype.getTotal = function() {
      return this.findAll().pipe(function(users) {
        return users.length;
      });
    };

    AdminUsers.prototype.search = function(query) {
      var path;
      path = "/_all_docs?include_docs=true";
      path = "" + path + "&startkey=\"org.couchdb.user:user/" + query + "\"&endkey=\"org.couchdb.user:user/" + query + "|\"";
      return this.request("GET", path).pipe(this._mapDocsFromFindAll).pipe(this.parseAllFromRemote);
    };

    AdminUsers.prototype._mapDocsFromFindAll = function(response) {
      var rows;
      rows = response.rows.filter(function(row) {
        return /^org\.couchdb\.user:/.test(row.id);
      });
      return rows.map(function(row) {
        return row.doc;
      });
    };

    return AdminUsers;

  })(Hoodie.Remote);

}).call(this);
