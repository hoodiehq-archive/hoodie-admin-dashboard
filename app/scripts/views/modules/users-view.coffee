class Pocket.UsersView.Router extends Backbone.SubRoute
  routes:
    ""              : "default"
    "user/:id"      : "editUser"

  constructor: ->
    @view = new Pocket.ModulesView['module-users']
    super

  default: ->
    # this needs to be here, otherwise: infinite loop

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
    'click .addTestUsers button[type="submit"]'   : 'addTestUsers'
    'click .removeTestUsers button[type="submit"]': 'removeTestUsers'
    'click .addRealUser button[type="submit"]'    : 'addRealUser'
    'click .user a.remove'                        : 'removeUser'
    'click .clearSearch'                          : 'clearSearch'

  constructor : ->
    super

  update : =>
    $.when(
      hoodie.admin.users.findAll(),
      hoodie.admin.modules.find('users'),
      hoodie.admin.config.get()
    ).then (users, object, appConfig) =>
      @totalUsers   = users.length
      @users        = users
      @config       = $.extend @_configDefaults(), object.config
      @appConfig    = appConfig
      switch users.length
        when 0
          @resultsDesc = "You have no users yet"
        when 1
          @resultsDesc = "You have a single user"
        else
          @resultsDesc = "Currently displaying all #{@totalUsers} users"

      # config defaults
      @config.confirmationEmailText or= "Hello {name}! Thanks for signing up with #{appInfo.name}"
      @render()

  updateConfig : (event) ->
    event.preventDefault()
    window.promise = hoodie.admin.modules.update('module', 'users', @_updateModule)

  emailTransportNotConfigured : ->
    isConfigured = @appConfig?.email?.transport?
    not isConfigured

  addTestUsers : (event) ->
    event.preventDefault()
    $btn = $(event.currentTarget);
    users = parseInt($btn.closest('form').find('.amountOfTestUsers').val())
    if _.isNumber(users) and users > 0
      $btn.attr('disabled', 'disabled')
      if users is 1
        $btn.siblings('.submitMessage').text("Adding a test user…")
      else
        $btn.siblings('.submitMessage').text("Adding #{users} test users…")
      $.when(hoodie.admin.users.addTestUsers(users)).then () =>
        @update()
    else
      $btn.siblings('.submitMessage').text("That's not a number")

  removeTestUsers : (event) ->
    event.preventDefault()
    users = $( ".user[data-id^='test']" )
    users.each (index, user) ->
      id = $(user).data('id');
      hoodie.admin.users.remove('user', id).then ->
        $('[data-id="'+id+'"]').remove()

  addRealUser : (event) ->
    event.preventDefault()
    $btn = $(event.currentTarget);
    username = $btn.closest('form').find('.username').val()
    password = $btn.closest('form').find('.password').val()
    if(username and password)
      $btn.attr('disabled', 'disabled')
      $btn.siblings('.submitMessage').text("Adding #{username}…")

      ownerHash = hoodie.uuid()
      hoodie.admin.users.add('user', {
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

  removeUser : (event) =>
    event.preventDefault()
    id = $(event.currentTarget).closest("[data-id]").data('id');
    type = $(event.currentTarget).closest("[data-type]").data('type');
    hoodie.admin.users.remove(type, id).then =>
      $('[data-id="'+id+'"]').remove()
      @update()

  editUser : (id) ->
    console.log("in view: editUser: ",id);
    ###
    event.preventDefault()
    id = $(event.currentTarget).closest("[data-id]").data('id');
    $.when(hoodie.admin.users.find('user', id)).then (user) =>
      @editUser = user
      @render()
    ###

  search : (event) ->
    event.preventDefault()
    @searchQuery = $('input.search-query', event.currentTarget).val()
    $.when(
      hoodie.admin.users.search(@searchQuery)
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

  _updateModule : (module) =>
    module.config.confirmationMandatory     = @$el.find('[name=confirmationMandatory]').is(':checked')
    module.config.confirmationEmailFrom     = @$el.find('[name=confirmationEmailFrom]').val()
    module.config.confirmationEmailSubject  = @$el.find('[name=confirmationEmailSubject]').val()
    module.config.confirmationEmailText     = @$el.find('[name=confirmationEmailText]').val()
    return module

  _configDefaults : ->
    confirmationEmailText : "Hello {name}! Thanks for signing up with #{@appInfo.name}"
