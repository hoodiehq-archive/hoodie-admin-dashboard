class Pocket.Router extends Backbone.Router

  routes:
    ""                        : "dashboard"
    "modules/:moduleName"     : "modules"

  dashboard: ->
    view = new Pocket.DashboardView
    pocket.app.views.body.setView(".main", view)

    $.when(
      hoodie.admin.getStats(1358610679),
      hoodie.admin.getConfig()
    ).then (stats, appConfig) ->
      view.stats     = stats
      view.appConfig = appConfig
      view.render()

  modules: (moduleName) ->
    console.log(moduleName)
    view = new Pocket.ModulesView
    pocket.app.views.body.setView(".main", view)

    window.hoodie.admin.modules.find(moduleName).then (module) ->
      view.module = module
      view.render()


