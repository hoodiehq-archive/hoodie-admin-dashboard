# Hoodie.AdminUsers
# ================

# inherits from [Hoodie.Remote](http://hoodiehq.github.com/hoodie.js/doc/hoodie/remote.html)
# and adds these extra methods:
#
# * total
# * search
#
class Hoodie.AdminUsers extends Hoodie.Remote

  name : '_users'

  constructor: (@hoodie, @admin) ->
    super

  total: () =>
    @hoodie.resolveWith(4211)

  search: ->
    @hoodie.resolveWith(4211)
