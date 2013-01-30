class Pocket.ModulesView['module-users'] extends Pocket.ModulesBaseView
  template: 'modules/users'

  events :
    'submit form.config' : 'updateConfig'

  update : ->
    $.when(
      hoodie.admin.users.store.findAll(),
      hoodie.admin.modules.store.find('module', 'users'),
      hoodie.admin.getConfig()
    ).then (users, object, appConfig) =>
      @users     = users
      @config    = $.extend @_configDefaults(), object.config
      @appConfig = appConfig

      # config defaults
      @config.confirmationEmailText or= "Hello {name}! Thanks for signing up with #{appInfo.name}"

      @render()

  updateConfig : (event) ->
    event.preventDefault()
    window.promise = hoodie.admin.modules.store.update('module', 'users', @_updateModule)

  emailTransportNotConfigured : ->
    isConfigured = @appConfig?.email?.transport?
    not isConfigured


  _updateModule : (module) =>
    module.config.confirmationMandatory     = @$el.find('[name=confirmationMandatory]').is(':checked')
    module.config.confirmationEmailFrom     = @$el.find('[name=confirmationEmailFrom]').val()
    module.config.confirmationEmailSubject  = @$el.find('[name=confirmationEmailSubject]').val()
    module.config.confirmationEmailText     = @$el.find('[name=confirmationEmailText]').val()
    return module

  _configDefaults : ->
    confirmationEmailText : "Hello {name}! Thanks for signing up with #{@appInfo.name}"
