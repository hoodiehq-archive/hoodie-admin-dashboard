class pocket.Routers.ApplicationRouter extends Backbone.Router

  routes:
    ""            : "dashboard"
    "users"       : "users"

  dashboard: ->
    pocket.app.dashboard.active()

  users: ->
    pocket.app.users.active()


