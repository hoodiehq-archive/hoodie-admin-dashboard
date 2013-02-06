# Hoodie.AdminUsersStore
# ========================

# inherits from [Hoodie.RemoteStore](http://hoodiehq.github.com/hoodie.js/doc/hoodie/remote_store.html)
# and adjusts findAll and stuff.
#
class Hoodie.AdminUsersStore extends Hoodie.RemoteStore

  getTotal : ->
    @findAll().pipe (users) -> users.length

  search : (query) ->
    path = "/_all_docs?include_docs=true"
    path = "#{path}&startkey=\"org.couchdb.user:user/#{query}\"&endkey=\"org.couchdb.user:user/#{query}|\""

    @remote.request("GET", path)
    .pipe(@_mapDocsFromFindAll).pipe(@parseAllFromRemote)

  # filter out non-user docs
  _mapDocsFromFindAll : (response) =>
    rows = response.rows.filter (row) -> /^org\.couchdb\.user:/.test row.id
    rows.map (row) -> row.doc

