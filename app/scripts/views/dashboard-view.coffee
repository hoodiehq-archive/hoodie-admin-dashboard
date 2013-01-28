class Pocket.DashboardView extends Pocket.BaseView
  template: 'dashboard'

  onSignInSuccess: () =>
    window.location.reload()

  onSignInFail: () =>
    $('form.signIn .error').text('Wrong password, please try again')
    $('#signIn').attr('disabled', null)
