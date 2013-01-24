# Hoodie.Admin
# ==============

# Extends hoodie with an admin module with
# commont tasks needed for the pocket admin UI.
#
class Hoodie.Admin

  constructor: (hoodie) ->
    @hoodie = hoodie

    @users   = new Hoodie.AdminUsers this
    @config  = new Hoodie.AdminConfig this
    @logs    = new Hoodie.AdminLogs this
    @modules = new Hoodie.AdminModules this


  # ## on

  #
  on : (event, callback) ->


  # ## sign in

  #
  signIn : (password) => @hoodie.resolveWith()


  # ## app

  #
  app : ->

    # dummy app info
    info =
      name: "minutes.io"

    @hoodie.resolveWith(info)


  # ## stats

  #
  stats : (since) ->

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

Hoodie.extend "admin", Hoodie.Admin
