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
