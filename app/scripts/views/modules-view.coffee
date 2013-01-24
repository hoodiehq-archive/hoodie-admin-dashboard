class pocket.Views.modulesView extends pocket.Views.baseView
  template: 'modules'

  initialize: ->
    super
    @setElement( $('.main') )

  active: (params) ->
    @loadModules()

  loadModules: ->
    window.hoodie.admin.modules.findAll().then(@render)

  render: (@modules) =>
    @appInfo = pocket.appInfo;
    for key, module of @modules
      module.url = module.name.replace('worker-', '')
      module.cleanName = @makeURLHuman module.url
      if JST["modules/"+module.name]
        module.formHTML = Handlebars.VM.template(JST["modules/"+module.name]) this
    @$el.html Handlebars.VM.template(JST[@template]) this
    $('.formCondition').each (index, el) ->
      pocket.handleConditionalFormElements(el, 0)
    super