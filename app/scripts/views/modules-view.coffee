class Pocket.ModulesView extends Pocket.BaseView
  template: 'module'

  beforeRender: () =>
    @module.url = @module.name.replace('worker-', '')
    @module.cleanName = @makeURLHuman @module.url
    @appInfo = pocket.appInfo
    # Check if the module has its own template and load it
    if JST["modules/"+@module.name]
      @module.formHTML = Handlebars.VM.template(JST["modules/"+@module.name]) this

  afterRender: ->
    # Deal with all conditional form elements once after rendering the form
    @$el.find('.formCondition').each (index, el) ->
      pocket.handleConditionalFormElements(el, 0)
