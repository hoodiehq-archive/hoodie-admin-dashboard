(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Hoodie.AdminUsersStore = (function(_super) {

    __extends(AdminUsersStore, _super);

    function AdminUsersStore() {
      this._mapDocsFromFindAll = __bind(this._mapDocsFromFindAll, this);
      return AdminUsersStore.__super__.constructor.apply(this, arguments);
    }

    AdminUsersStore.prototype.getTotal = function() {
      return this.findAll().pipe(function(users) {
        return users.length;
      });
    };

    AdminUsersStore.prototype.search = function(query) {
      var path;
      path = "/_all_docs?include_docs=true";
      path = "" + path + "&startkey=\"org.couchdb.user:" + query + "\"&endkey=\"org.couchdb.user:" + query + "|\"";
      return this.remote.request("GET", path).pipe(this._mapDocsFromFindAll).pipe(this.parseAllFromRemote);
    };

    AdminUsersStore.prototype._mapDocsFromFindAll = function(response) {
      var rows;
      rows = response.rows.filter(function(row) {
        return /^org\.couchdb\.user:/.test(row.id);
      });
      return rows.map(function(row) {
        return row.doc;
      });
    };

    return AdminUsersStore;

  })(Hoodie.RemoteStore);

}).call(this);
