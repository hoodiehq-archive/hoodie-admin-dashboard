class Pocket.Router extends Backbone.Router

  routes:
    ""                                  : "dashboard"
    "modules/:moduleName"               : "modules"
    "modules/:moduleName/*subroute"     : "modules"

  dashboard: ->
    view = new Pocket.DashboardView
    pocket.app.views.body.setView(".main", view)

    $.when(
      hoodie.admin.app.getStats(1358610679),
      hoodie.admin.config.get()
    ).then (stats, appConfig) ->
      view.stats     = stats
      view.appConfig = appConfig
      view.render()

  modules: (moduleName, subroute) ->
    console.log(moduleName, subroute)
    view = new Pocket.ModulesView
    pocket.app.views.body.setView(".main", view)

    unless Pocket.Routers
      Pocket.Routers = {}

    window.hoodie.admin.modules.find(moduleName).then (module) =>
      moduleViewName = @capitaliseFirstLetter(moduleName)+"View"
      view.module = module
      unless Pocket.Routers[moduleViewName]?
        Pocket.Routers[moduleViewName] = new Pocket[moduleViewName].Router('modules/'+moduleName, {createTrailingSlashRoutes: true});
      view.render()

  capitaliseFirstLetter : (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)


