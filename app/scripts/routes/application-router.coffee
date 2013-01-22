class pocket.Routers.ApplicationRouter extends Backbone.Router

  routes:
    ""                        : "dashboard"
    "users"                   : "users"
    "modules/:moduleName"     : "modules"

  dashboard: ->
    pocket.app.dashboard.active()

  users: ->
    pocket.app.users.active()

  modules: (params) ->
    pocket.app.modules.active(params)


