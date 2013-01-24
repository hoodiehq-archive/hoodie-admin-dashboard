class pocket.Views.dashboardView extends pocket.Views.baseView
  template: 'dashboard'

  initialize: ->
    super
    @setElement( $('.main') )
    @appInfo = pocket.appInfo;

  active: ->
    if pocket.isAuthenticated
      @loadStats()
    else
      @renderSignin()

  loadStats: ->
    window.hoodie.admin.stats(1358610679).then(@render)

  render: (@stats) =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super

  renderSignin: () =>
    @$el.html Handlebars.VM.template(JST["signin"]) this
    $('form.signIn').submit (event) ->
      event.preventDefault()
      hoodie.admin.signIn($('#signInPassword').val())
      return false