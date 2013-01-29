class Pocket.ModulesView extends Pocket.BaseView
  template: 'module'

  beforeRender: () =>
    @module.url = @module.id.replace('worker-', '')
    @module.cleanName = @makeURLHuman @module.url
    @appInfo = pocket.appInfo

    @removeView(".module-content") if @getView(".module-content")

    if @moduleViewExists @module.id
      view = @getModuleView @module.id
      @setView(".module-content", view)
      view.update?()

  moduleViewExists : (name) ->
    Pocket.ModulesView["module-#{name}"]?

  _cachedViews : {}
  getModuleView : (name) ->
    unless @_cachedViews[name]
      @_cachedViews[name] = new Pocket.ModulesView["module-#{@module.id}"]

    return @_cachedViews[name]


