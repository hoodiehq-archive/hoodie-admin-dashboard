class Pocket.ModulesView['module-users'] extends Pocket.ModulesBaseView
  template: 'modules/users'

  events :
    'submit form.config' : 'updateConfig'

  update : ->
    hoodie.admin.users.store.findAll().then (users) =>
      @users = users
      @render()

  updateConfig : (event) ->
    event.preventDefault()
    window.promise = hoodie.admin.modules.store.update('module', 'users', @_updateModule)


  _updateModule : (module) =>
    module.config.confirmationMandatory     = @$el.find('[name=confirmationMandatory]').is(':checked')
    module.config.confirmationEmailFrom     = @$el.find('[name=confirmationEmailFrom]').val()
    module.config.confirmationEmailSubject  = @$el.find('[name=confirmationEmailSubject]').val()
    module.config.confirmationEmailText     = @$el.find('[name=confirmationEmailText]').val()
    return module
