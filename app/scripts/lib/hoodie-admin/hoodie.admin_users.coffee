# Hoodie.AdminUsers
# ================

# inherits from [Hoodie.Remote](http://hoodiehq.github.com/hoodie.js/doc/hoodie/remote.html)
# and adds these extra methods:
#
# * total
# * search
#
class Hoodie.AdminUsers extends Hoodie.Remote

  name   : '_users'

  constructor: (hoodie, admin) ->
    @hoodie = hoodie
    @admin  = admin
    super

  addTestUser: (email) ->
    baseUrl = hoodie.baseUrl
    hash = "test-#{hoodie.uuid(5)}"

    testHoodieUser = new Hoodie baseUrl.replace(/\bapi\./, "#{hash}.api.")
    testHoodieUser.account.ownerHash = hash

    unless email
      email = "#{testHoodieUser.account.ownerHash}@example.com"

    testHoodieUser.account.signUp( email, 'secret' )

  addTestUsers: ( nr = 1 ) ->
    timestamp = (new Date).getTime()
    promises = for i in [1..nr]
      @addTestUser()

    $.when promises...

  removeAllTestUsers: ->
    @hoodie.rejectWith(error: "not yet implemented")


  getTotal : ->
    @findAll().pipe (users) -> users.length

  search : (query) ->
    path = "/_all_docs?include_docs=true"
    path = "#{path}&startkey=\"org.couchdb.user:user/#{query}\"&endkey=\"org.couchdb.user:user/#{query}|\""

    @request("GET", path)
    .pipe(@_mapDocsFromFindAll).pipe(@parseAllFromRemote)


  # filter out non-user docs
  _mapDocsFromFindAll : (response) =>
    rows = response.rows.filter (row) -> /^org\.couchdb\.user:/.test row.id
    rows.map (row) -> row.doc
