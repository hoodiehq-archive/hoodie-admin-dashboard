# Hoodie.Admin
# ==============

# Extends hoodie with an admin module with
# commont tasks needed for the pocket admin UI.
#
class Hoodie.Admin

  constructor: (@hoodie) ->
    @users   = new Hoodie.AdminUsers   @hoodie, this
    @config  = new Hoodie.AdminConfig  @hoodie, this
    @logs    = new Hoodie.AdminLogs    @hoodie, this
    @modules = new Hoodie.AdminModules @hoodie, this


  # on
  # --------------

  #
  on : (event, callback) ->


  # authenticate
  # --------------

  # runs the standard hoodie.account.authenticate
  # method, but also makes sure that username is
  # "admin"
  authenticate : (password) =>
    unless @hoodie.account.username is 'admin'
      return @hoodie.rejectWith("Not signed in as admin.")

    @hoodie.account.authenticate()


  # sign in
  # --------------

  #
  signIn : (password) =>
    @hoodie.resolveWith()


  # app
  # --------------

  #
  app : ->

    # dummy app info
    info =
      name: "minutes.io"

    @hoodie.resolveWith(info)


  # stats
  # --------------

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
