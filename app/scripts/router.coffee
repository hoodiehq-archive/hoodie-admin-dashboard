class Pocket.Router extends Backbone.Router

  routes:
    ""                                  : "dashboard"
    "modules/:moduleName"               : "modules"
    "modules/:moduleName/*subroute"     : "modules"

  dashboard: ->
    console.log("dashboard: ");
    view = new Pocket.DashboardView
    pocket.app.views.body.setView(".main", view)

    $.when(
      hoodieAdmin.app.getStats(1358610679),
      hoodieAdmin.config.get()
    ).then (stats, appConfig) ->
      view.stats     = stats
      view.appConfig = appConfig
      view.render()

  modules: (moduleName, subroute) ->
    console.log("modules: ",moduleName, subroute);

    unless Pocket.Routers
      Pocket.Routers = {}

    window.hoodieAdmin.modules.find(moduleName).then (module) =>
      moduleViewName = @capitaliseFirstLetter(moduleName)+"View"
      # If module has a Router to handle its own subroutes
      if !Pocket.Routers[moduleViewName] and Pocket[moduleViewName]?.Router
        Pocket.Routers[moduleViewName] = new Pocket[moduleViewName].Router('modules/'+moduleName, {createTrailingSlashRoutes: true});
      else
        # Module has no routes of its own
        view = new Pocket.ModulesView
        pocket.app.views.body.setView(".main", view)
        view.module = module
        view.render()

  capitaliseFirstLetter : (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)


