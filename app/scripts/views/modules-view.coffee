class pocket.Views.modulesView extends pocket.Views.baseView
  template: 'modules'

  initialize: ->
    super
    @setElement( $('.main') )

  active: (params) ->
    if pocket.isAuthenticated
      @loadModules()
    else
      pocket.router.navigate '/'

  loadModules: ->
    window.hoodie.admin.modules.findAll().then(@render)

  render: (@modules) =>
    for key, module of @modules
      module.url = module.name.replace('worker-', '')
      module.cleanName = @makeURLHuman module.url
      # Check if the module has its own template and load it
      if JST["modules/"+module.name]
        module.formHTML = Handlebars.VM.template(JST["modules/"+module.name]) this
    @$el.html Handlebars.VM.template(JST[@template]) this
    # Deal with all conditional form elements once after rendering the form
    $('.formCondition').each (index, el) ->
      pocket.handleConditionalFormElements(el, 0)
    super