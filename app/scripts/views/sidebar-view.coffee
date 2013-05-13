class Pocket.SidebarView extends Pocket.BaseView
  template: 'sidebar'

  handleNavigationStates: (route) ->
    route = route.replace 'route:', ''
    $el = $('nav a[href="/#'+route+'"]').parent()
    unless $el.hasClass("active")
      $("nav li.active").removeClass "active"
      $el.addClass "active"

  afterRender: ->
    @loadAppName()
    Backbone.history.bind "all", (route) =>
      @handleNavigationStates Backbone.history.fragment
    @loadModules()
    super

  loadAppName: ->
    window.hoodieAdmin.app.getInfo().then(@renderAppName)

  renderAppName: (@appInfo) =>
    @$el.find('header .appName a').text @appInfo.name
    $('.sidebar header .appName').bigtext({
      maxfontsize: 20
    })

  getUserModuleLabel: (@totalUsers) ->
    switch @totalUsers
      when 0
        @label = "No users"
      when 1
        @label = "One user"
      else
        @label = "#{@totalUsers} users"

  updateUserCount: (eventName, userObject) =>
    $.when(
      window.hoodieAdmin.users.getTotal()
    ).then (@totalUsers) =>
      $('.sidebar .modules .users .name').text(@getUserModuleLabel(@totalUsers))

  loadModules: ->
    debouncedUserCount = _.debounce(@updateUserCount, 300)
    hoodieAdmin.users.on "change", (eventName, userObject) ->
      debouncedUserCount(eventName, userObject)
    hoodieAdmin.users.connect();
    $.when(
      window.hoodieAdmin.modules.findAll(),
      window.hoodieAdmin.users.getTotal()
    ).then @renderModules

  # Generates module menu with badges
  renderModules: (@modules, @totalUsers) =>
    for key, module of @modules
      module.url = module.id
      module.cleanName = @makeURLHuman module.url
      # Special treatment for the users module: show user amount
      if module.cleanName is "Users"
        module.cleanName = @getUserModuleLabel(@totalUsers)
      module.badgeStatus = 'badge-'+module.status
      if module.messages
        module.messageAmount = module.messages.length
      else
        module.messageAmount = ''

    @$el.find('nav ul.modules').html JST['sidebar-modules'](this)
