class Pocket.ModulesView['module-appconfig'] extends Pocket.ModulesBaseView
  template: 'modules/appconfig'

  events:
    "submit form.email": "updateConfig"

  update : ->
    hoodieAdmin.config.get().then (config) =>
      @config = config
      @render()

  updateConfig: (event) ->
    @$el.find('.submit').attr('disabled', 'disabled')
    event.preventDefault()

    username = @$el.find('.username').val()
    password = @$el.find('.password').val()

    @config = @_getConfigSkeleton()
    @config.email.transport.auth.user = username
    @config.email.transport.auth.pass = password

    promise = hoodieAdmin.config.set(@config).then(@handleSubmitSuccess, @handleSubmitError)

  handleSubmitError: (error) =>
    console.log "Could not save global mail config"
    console.log error
    @$el.find('.submit').attr('disabled', null)
    @$el.find('.submit').siblings('span').text('Could not save global mail config')

  handleSubmitSuccess: =>
    console.log "Config saved"
    @$el.find('.submit').attr('disabled', null)
    $message = @$el.find('.submit').siblings('span')
    $.when($message.text('Config saved').delay(2000).fadeOut()).done(=>
      $message.empty().show()
    )

  #
  _getConfigSkeleton: ->
    email :
      transport :
        service : 'GMAIL'
        auth :
          user : ''
          pass : ''
