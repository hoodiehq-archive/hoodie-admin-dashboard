class Pocket.ModulesBaseView extends Pocket.BaseView

  afterRender: ->
    # Deal with all conditional form elements once after rendering the form
    @$el.find('.formCondition').each (index, el) ->
      pocket.handleConditionalFormElements(el, 0)

    super
