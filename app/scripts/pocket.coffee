class window.Pocket extends Backbone.Events

  # this is the entry point of your application.
  constructor: ->
    window.pocket = this
    @setElement('html')
    @registerHandlebarsHelpers()
    @registerListeners()
    @handleSignInAndSignOut()

    $.when(@loadAppInfo(), @authenticate()).then =>
      @router = new Pocket.Router
      @app    = new Pocket.ApplicationView

      Backbone.history.start()


  #
  setElement: (selector) ->
    @$el = $ selector


  #
  authenticate: =>
    hoodie.admin.authenticate().then(@handleAuthenticateSuccess, @handleAuthenticateError)


  #
  handleAuthenticateSuccess: () =>
    @isAuthenticated = true;
    @$el.addClass 'authenticated'
    hoodie.resolveWith @isAuthenticated

  #
  handleAuthenticateError: () =>
    @isAuthenticated = false;
    hoodie.resolveWith @isAuthenticated


  #
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


  #
  registerListeners: ->
    $("body").on "change", ".formCondition", (event) =>
      @handleConditionalFormElements(event.target)
    $("body").on "click", "a.signOut", (event) =>
      event.preventDefault()
      hoodie.admin.signOut().done(@onSignOutSuccess).fail(@onSignOutFail)


  #
  registerHandlebarsHelpers: ->
    Handlebars.registerHelper 'testHelper', (name, context) ->
      return "HANDLEBARS TESTHELPER"


  #
  handleSignInAndSignOut: ->
    hoodie.account.on 'signin', ->
      window.location.reload()

    hoodie.account.on 'signout', ->
      console.log('cannot handle signout yet, hoodie is buggy here.
        you need te reload manually')

  loadAppInfo: =>
    hoodie.admin.getAppInfo().pipe(@setAppInfo)

  setAppInfo: (info) =>
    console.log 'info', info
    pocket.appInfo = info
