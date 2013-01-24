whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api")
window.hoodie = new Hoodie(whereTheMagicHappens)
###
hoodie.request("GET", "/").done((data) ->
  console.log "hoodie is a go."
  console.log data
).fail (error) ->
  console.log "hoodie has an error."
  console.log error
###

window.pocket =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}

  handleConditionalFormElements: (el, speed = 250) ->
    conditions = $(el).data "conditions"
    conditions = conditions.split ','
    for condition in conditions
      requirement = condition.split(':')[0]
      target = condition.split(':')[1]
      requirementMet = false

      # checkboxes are extra special little bunnies
      if $(el).is('input[type=checkbox]')
        # is it supposed to be checked?
        if $(el).is(':checked') && requirement == "true"
          requirementMet = true
        # is it supposed to be unchecked?
        if !$(el).is(':checked') && requirement == "false"
          requirementMet = true

      # other non-checkbox inputs
      if $(el).val() is requirement
        requirementMet = true

      if requirementMet
        $(target).slideDown speed
      else
        $(target).slideUp speed

  registerListeners: ->
    $("body").on "change", ".formCondition", (event) =>
      @handleConditionalFormElements(event.target)

  registerHandlebarsHelpers: ->
    Handlebars.registerHelper 'testHelper', (name, context) ->
      return "HANDLEBARS TESTHELPER"

  init: ->
    @registerHandlebarsHelpers()
    @registerListeners()
    console.log "Hello from Backbone! Woop"
    @router = new pocket.Routers.ApplicationRouter
    @app = new pocket.Views.applicationView
    Backbone.history.start()

window.escapeExpression = Handlebars.Utils.escapeExpression

$(document).ready ->
  pocket.init()
