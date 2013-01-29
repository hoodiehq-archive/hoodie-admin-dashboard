class Pocket.ModulesView extends Pocket.BaseView
  template: 'module'

  beforeRender: () =>
    @module.url = @module.name.replace('worker-', '')
    @module.cleanName = @makeURLHuman @module.url
    @appInfo = pocket.appInfo

    @removeView(".module-content") if @getView(".module-content")
    if Pocket.ModulesView["module-#{@module.name}"]
      # @views['.module-content'] = new Pocket.ModulesView["module-#{@module.name}"]
      view = new Pocket.ModulesView["module-#{@module.name}"]
      @setView(".module-content", view)
    # else
    #   delete @views['.module-content']

    # Check if the module has its own template and load it
    # if JST["modules/"+@module.name]
    #  @module.formHTML = Handlebars.VM.template(JST["modules/"+@module.name]) this
