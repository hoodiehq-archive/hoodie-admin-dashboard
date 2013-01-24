# Hoodie.AdminUsers
# ================

#
class Hoodie.AdminUsers

  constructor: (admin) ->
    @admin  = admin
    @hoodie = admin.hoodie

  total: () =>
    @hoodie.resolveWith(4211)

  findAll: (options) =>
    users = [
      name: "hello@alex.com"
      lastLogin: "2013-01-21T16:07:20.574Z"
      signedUpAt: "2013-01-18T16:07:20.574Z"
      state: "confirmed"
    ,
      name: "hello@gregor.com"
      lastLogin: "2013-01-16T16:07:20.574Z"
      signedUpAt: "2013-01-15T16:07:20.574Z"
      state: "new"
    ,
      name: "hello@jan.com"
      lastLogin: "2013-01-01T16:07:20.574Z"
      signedUpAt: "2012-12-20T16:07:20.574Z"
      state: "deleted"
    ]
    @hoodie.resolveWith(users)

  search: ->