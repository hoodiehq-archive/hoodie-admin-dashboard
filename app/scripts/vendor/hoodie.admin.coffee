class HoodieAdminClass

  constructor: (hoodie) ->
    @hoodie = hoodie

    @app = () ->

      # dummy app info
      info =
        name: "minutes.io"

      @hoodie.resolveWith(info)

    @users =
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

    @config =
      get: =>

      set: =>

    @on = ->

    @logs =
      findAll: =>

    @stats = (since) ->

      # dummy stats
      stats =
        signups: 12
        account_deletions: 1
        users_active: 1302
        users_total: 4211
        growth: 0.04
        active: -0.02
        since: since

      unless since
        for key of stats
          stats[key] = stats[key] * 17
      @hoodie.resolveWith(stats)

    @modules = (since) ->

      # dummy stats
      modules =
        signups: 12
        account_deletions: 1
        users_active: 1302
        users_total: 4211
        growth: 0.04
        active: -0.02
        since: since

      unless since
        for key of stats
          stats[key] = stats[key] * 17
      @hoodie.resolveWith(stats)

Hoodie.extend "admin", HoodieAdminClass