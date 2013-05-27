class Pocket.UsersView.Router extends Backbone.SubRoute
  routes:
    ""              : "default"
    "user/:id"      : "editUser"

  constructor: ->
    @view = new Pocket.ModulesView['module-users']
    pocket.app.views.body.setView(".main", @view)
    super

  default: ->
    @view.update()

  editUser: (id) ->
    @view.editUser(id)

class Pocket.ModulesView['module-users'] extends Pocket.ModulesBaseView
  template: 'modules/users'
  sort: undefined
  sortBy: undefined
  sortDirection: undefined

  events :
    'submit form.config'                          : 'updateConfig'
    'submit form.form-search'                     : 'search'
    'submit form.updatePassword'                  : 'updatePassword'
    'submit form.updateUsername'                  : 'updateUsername'
    'click .addUser button[type="submit"]'        : 'addUser'
    'click .user a.removeUserPrompt'              : 'removeUserPrompt'
    'click #confirmUserRemoveModal .removeUser'   : 'removeUser'
    'click .clearSearch'                          : 'clearSearch'

  constructor : ->
    super

  update : =>
    $.when(
      hoodieAdmin.users.findAll(),
      hoodieAdmin.modules.find('users'),
      hoodieAdmin.config.get()
    ).then (users, object, appConfig) =>
      @totalUsers   = users.length
      @users        = users
      @config       = $.extend @_configDefaults(), object.config
      @appConfig    = appConfig
      @editableUser = null
      switch users.length
        when 0
          @resultsDesc = "You have no users yet"
        when 1
          @resultsDesc = "You have a single user"
        else
          @resultsDesc = "Currently displaying all #{@totalUsers} users"

      # config defaults
      @config.confirmationEmailText or= "Hello {name}, Thanks for signing up!"
      @render()

  updateConfig : (event) ->
    event.preventDefault()
    window.promise = hoodieAdmin.modules.update('module', 'users', @_updateModule)

  emailTransportNotConfigured : ->
    isConfigured = @appConfig?.email?.transport?
    not isConfigured

  addUser : (event) ->
    event.preventDefault()
    $btn = $(event.currentTarget);
    username = $btn.closest('form').find('.username').val()
    password = $btn.closest('form').find('.password').val()
    if(username and password)
      $btn.attr('disabled', 'disabled')
      $btn.siblings('.submitMessage').text("Adding #{username}…")

      ownerHash = hoodieAdmin.uuid()
      hoodieAdmin.users.add('user', {
        id : username
        name : "user/#{username}"
        ownerHash : ownerHash
        database : "user/#{ownerHash}"
        signedUpAt : new Date()
        roles : []
        password : password
      })
      .done(@update)
      .fail (data) ->
        console.log "could not add user: ", data
        $btn.attr('disabled', null)
        if data.statusText is "Conflict"
          $btn.siblings('.submitMessage').text("Sorry, '#{username}' already exists")
        else
          $btn.siblings('.submitMessage').text("Error: "+data.status+" - "+data.responseText)
    else
      $btn.siblings('.submitMessage').text("Please enter a username and a password")

  removeUserPrompt : (event) =>
    event.preventDefault()
    id = $(event.currentTarget).closest("[data-id]").data('id');
    type = $(event.currentTarget).closest("[data-type]").data('type');
    $('#confirmUserRemoveModal')
      .modal('show')
      .data
        id: id
        type: type
      .find('.modal-body').text('Really remove the user '+id+'? This cannot be undone!').end()
      .find('.modal-title').text('Remove user '+id).end()
    #removeUser(event)

  removeUser : (event) =>
    event.preventDefault()
    id = $('#confirmUserRemoveModal').data('id');
    type = $('#confirmUserRemoveModal').data('type');
    hoodieAdmin.users.remove(type, id).then =>
      $('[data-id="'+id+'"]').remove()
      $('#confirmUserRemoveModal').modal('hide')
      @update()

  editUser : (id) ->
    $.when(hoodieAdmin.users.find('user', id)).then (user) =>
      @editableUser = user
      @render()
      return

  updateUsername : (event) ->
    event.preventDefault()
    id = $(event.currentTarget).closest('form').data('id');
    $form = $(event.currentTarget);
    $btn = $form.find('[type="submit"]');
    #oldUsername = $form.find('[name="username"]').data('oldusername')
    #username = $form.find('[name="username"]').val()

  updatePassword : (event) ->
    event.preventDefault()
    id = $(event.currentTarget).closest('form').data('id');
    $form = $(event.currentTarget);
    $btn = $form.find('[type="submit"]');
    password = $form.find('[name="password"]').val()
    if password
      $btn.attr('disabled', 'disabled')
      $form.find('.submitMessage').text("Updating password")
      hoodieAdmin.users.update('user', id, {password: password})
      .done (data) ->
        $btn.attr('disabled', null)
        $form.find('.submitMessage').text("Password updated")
      .fail (data) ->
        $btn.attr('disabled', null)
        $form.find('.submitMessage').text("Error: could not update password")
    else
      $form.find('.submitMessage').text("You didn't change anything.")

  search : (event) ->
    event.preventDefault()
    @searchQuery = $('input.search-query', event.currentTarget).val()
    $.when(
      hoodieAdmin.users.search(@searchQuery)
    ).then (users) =>
      @users = users
      switch users.length
        when 0
          @resultsDesc  = "No users matching '#{@searchQuery}'"
        when 1
          @resultsDesc  = "#{users.length} user matching '#{@searchQuery}'"
        else
          @resultsDesc  = "#{users.length} users matching '#{@searchQuery}'"
      @render()

  clearSearch : (event) ->
    event.preventDefault()
    @searchQuery = null
    @update()

  beforeRender : =>
    @sortBy = $('#userList .sort-up, #userList .sort-down').data('sort-by')
    # get previous sorting parameters…
    if @sortBy
      @sortDirection = 'sort-down'
      if $('#userList .sort-up').length isnt 0
        @sortDirection = 'sort-up'
    else
      # …or set defaults
      @sortBy = "signupDate"
      @sortDirection = "sort-up"
    super

  afterRender : =>
    userList = document.getElementById('userList')
    if userList
      @sort = new Tablesort(userList);
      # sort by previous sorting parameters. Bit hacky, because tablesort has no api for this
      sortHeader = $('#userList [data-sort-by="'+@sortBy+'"]')
      sortHeader.click()
      if @sortDirection is 'sort-up'
        sortHeader.click()
    super

  _updateModule : (module) =>
    module.config.confirmationMandatory     = @$el.find('[name=confirmationMandatory]').is(':checked')
    module.config.confirmationEmailFrom     = @$el.find('[name=confirmationEmailFrom]').val()
    module.config.confirmationEmailSubject  = @$el.find('[name=confirmationEmailSubject]').val()
    module.config.confirmationEmailText     = @$el.find('[name=confirmationEmailText]').val()
    return module

  _configDefaults : ->
    #confirmationEmailText : "Hello {name}! Thanks for signing up with #{@appInfo.name}"
