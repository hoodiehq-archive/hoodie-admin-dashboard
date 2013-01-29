class Pocket.DashboardView extends Pocket.BaseView
  template: 'dashboard'

  events:
    "submit form.email": "signIn"

  signIn: (event) ->
    @$el.find('.submit').attr('disabled', 'disabled')
    event.preventDefault()
    userName = @$el.find('.userName').val()
    pass = @$el.find('.password').val()
    @config.email.transport.auth.user = userName
    @config.email.transport.auth.pass = pass
    hoodie.admin.setConfig(@config).fail(@handleSubmitError).done(@handleSubmitSuccess)

  handleSubmitError: () =>
    console.log "Could not save global mail config"
    @$el.find('.submit').attr('disabled', null)

  handleSubmitSuccess: () =>
    console.log "Config saved"
    @$el.find('.submit').attr('disabled', null)
