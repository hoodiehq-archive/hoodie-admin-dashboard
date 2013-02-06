# Hoodie.AdminUsers
# ================

# inherits from [Hoodie.Remote](http://hoodiehq.github.com/hoodie.js/doc/hoodie/remote.html)
# and adds these extra methods:
#
# * total
# * search
#
class Hoodie.AdminUsers extends Hoodie.Remote

  Store  : Hoodie.AdminUsersStore
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
    for i in [1..nr]
      @addTestUser()

  removeAllTestUsers: ->
    @hoodie.rejectWith(error: "not yet implemented")
