# Hoodie.AdminUsersStore
# ========================

# inherits from [Hoodie.RemoteStore](http://hoodiehq.github.com/hoodie.js/doc/hoodie/remote_store.html)
# and adjusts findAll and stuff.
#
class Hoodie.AdminUsersStore extends Hoodie.RemoteStore

  # filter out non-user docs
  _mapDocsFromFindAll: (response) =>
    rows = response.rows.filter (row) -> /^org\.couchdb\.user:/.test row.id
    rows.map (row) -> row.doc