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
    hoodie.admin.stats(1358610679).then(@render)

  render: (@stats) =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super

  renderSignin: () =>
    @$el.html Handlebars.VM.template(JST["signin"]) this
    $('form.signIn').submit (event) =>
      $('#signIn').attr('disabled', 'disabled')
      event.preventDefault()
      password = $('#signInPassword').val()
      hoodie.admin.signIn(password).done(@onSignInSuccess).fail(@onSignInFail)

  onSignInSuccess: () =>
    window.location.reload()

  onSignInFail: () =>
    $('form.signIn .error').text('Wrong password, please try again')
    $('#signIn').attr('disabled', null)
