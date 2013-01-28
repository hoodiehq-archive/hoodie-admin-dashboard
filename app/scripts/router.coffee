class Pocket.Router extends Backbone.Router

  routes:
    ""                        : "dashboard"
    "users"                   : "users"
    "modules/:moduleName"     : "modules"

  dashboard: ->
    view = new Pocket.DashboardView
    pocket.app.views.body.setView(".main", view)

    hoodie.admin.getStats(1358610679).then (stats) ->
      view.stats = stats
      view.render()

  users: ->
    view = new Pocket.UsersView
    pocket.app.views.body.setView(".main", view)

    window.hoodie.admin.users.store.findAll().then (users) =>
      view.users = users
      view.render()

  modules: (moduleName) ->
    console.log(moduleName)
    view = new Pocket.ModulesView
    pocket.app.views.body.setView(".main", view)

    window.hoodie.admin.modules.find(moduleName).then (module) ->
      view.module = module
      view.render()


