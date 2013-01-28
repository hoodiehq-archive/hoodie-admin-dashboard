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

    # dirty hack:
    # hoodie.account.signIn presets passed username with
    # "user/#{username}". We don't want that for our hoodie
    # actually, the only user we need is admin only anyway
    @hoodie.account._userKey = -> 'admin'

    hoodie = @hoodie
    @hoodie.account._handleSignInSuccess = (response) ->
      defer    = hoodie.defer()
      username = 'admin'

      hoodie.account._authenticated = true
      hoodie.account._setUsername username

      # special treatment for hoodie instance:
      # admins do not have their own database, so we don't
      # want the sync to kick in
      hoodie.config.set('_remote.sync', false)

      hoodie.account.trigger 'signin', username
      defer.resolve(username, username)

    @hoodie.remote.sync = => @hoodie.resolveWith()

    @hoodie.account._handleSignInSuccess.bind( @hoodie.account )

  # on
  # --------------

  #
  on : (event, callback) ->


  # authenticate
  # --------------

  # runs the standard hoodie.account.authenticate
  # method, but also makes sure that username is
  # "admin"
  #
  authenticate : (password) ->
    unless @hoodie.account.username is 'admin'
      return @hoodie.rejectWith("Not signed in as admin.")

    @hoodie.account.authenticate()


  # sign in
  # --------------

  # runs the standard hoodie.account.signIn
  # method, but with username set to "admin"
  #
  signIn : (password) ->
    username = "admin"
    @hoodie.account.signIn(username, password)


  # sign out
  # --------------

  # just an alias
  #
  signOut : () ->
    @hoodie.account.signOut()


  # getAppInfo
  # --------------

  #
  getAppInfo : ->

    defer = @hoodie.defer()

    # dummy app info
    info =
      name: "minutes.io"

    window.setTimeout ->
      defer.resolve(info)

    return defer.promise()


  # getStats
  # --------------

  #
  getStats : (since) ->

    defer = @hoodie.defer()

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

    window.setTimeout -> defer.resolve(stats)

    return defer.promise()

Hoodie.extend "admin", Hoodie.Admin
