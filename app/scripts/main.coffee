if (location.hostname is 'localhost')
  # debug mode, started wit yeoman, connect to
  # some existing hoodie app.
  whereTheMagicHappens = "http://api.pocket.dev"
else
  whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api")

window.hoodie = new Hoodie(whereTheMagicHappens)

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
    $("body").on "click", "a.signOut", (event) =>
      event.preventDefault()
      hoodie.admin.signOut().done(@onSignOutSuccess).fail(@onSignOutFail)

  registerHandlebarsHelpers: ->
    Handlebars.registerHelper 'testHelper', (name, context) ->
      return "HANDLEBARS TESTHELPER"

  init: ->
    @registerHandlebarsHelpers()
    @registerListeners()
    hoodie.admin.authenticate().then(@onAuthenticated, @onUnauthenticated)
    .then =>
      @router = new pocket.Routers.ApplicationRouter
      @app = new pocket.Views.ApplicationView
      Backbone.history.start()

  onAuthenticated: () =>
    pocket.isAuthenticated = true;
    $('body').addClass 'authenticated'

  onUnauthenticated: () =>
    pocket.isAuthenticated = false;
    return @hoodie.resolveWith()

  onSignOutSuccess: () =>
    window.location = '/'

  onSignOutFail: () =>
    console.log "I'm sorry Dave, I can't let you do that."

window.escapeExpression = Handlebars.Utils.escapeExpression

$(document).ready ->
  pocket.init()
