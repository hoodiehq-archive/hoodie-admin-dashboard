class Pocket.ModulesView['module-appconfig'] extends Pocket.ModulesBaseView
  template: 'modules/appconfig'

  events:
    "submit form.email": "updateConfig"

  update : ->
    hoodie.admin.getConfig().then (config) =>
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

    promise = hoodie.admin.setConfig(@config).then(@handleSubmitSuccess, @handleSubmitError)

  handleSubmitError: (error) =>
    console.log "Could not save global mail config"
    console.log error
    @$el.find('.submit').attr('disabled', null)

  handleSubmitSuccess: =>
    console.log "Config saved"
    @$el.find('.submit').attr('disabled', null)

  #
  _getConfigSkeleton: ->
    email :
      transport :
        service : 'GMAIL'
        auth :
          user : ''
          pass : ''
