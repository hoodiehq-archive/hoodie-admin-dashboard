class Pocket.MainView extends Pocket.BaseView

  views:
    ".sidebar" : new Pocket.SidebarView
    ".main"    : new Pocket.DashboardView

  events:
    "submit form.signIn": "signIn"

  signIn : (event) ->
    @$el.find('#signIn').attr('disabled', 'disabled')
    event.preventDefault()
    password = @$el.find('#signInPassword').val()
    hoodie.admin.signIn(password).fail(@handleSignInError)

  handleSignInError: () =>
    $('form.signIn .error').text('Wrong password, please try again')
    $('#signIn').attr('disabled', null)
