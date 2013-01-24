class pocket.Views.sidebarView extends pocket.Views.baseView
  template: 'sidebar'

  handleNavigationStates: (route) ->
    route = route.replace 'route:', ''
    $el = $('nav a[href="/#'+route+'"]').parent()
    unless $el.hasClass("active")
      $("nav li.active").removeClass "active"
      $el.addClass "active"

  initialize: ->
    super
    pocket.router.bind "all", (route) =>
      @handleNavigationStates Backbone.history.fragment
    @setElement( $('.sidebar') )
    @render()
    @loadUserTotal()
    @loadAppName()
    @loadModules()

  loadUserTotal: ->
    window.hoodie.admin.users.total().then(@renderUserTotal)

  renderUserTotal: (@userTotal) =>
    @$el.find('li.users .badge').text @userTotal

  loadAppName: ->
    window.hoodie.admin.app().then(@renderAppName)

  renderAppName: (@appInfo) =>
    @$el.find('header h1 a').text @appInfo.name

  loadModules: ->
    window.hoodie.admin.modules.findAll().then(@renderModules)

  renderModules: (@modules) =>
    for key, module of @modules
      module.url = module.name.replace('worker-', '')
      module.cleanName = @makeURLHuman module.url
      module.badgeStatus = 'badge-'+module.status
      if module.messages
        module.messageAmount = module.messages.length
      else
        module.messageAmount = ''
    @$el.find('nav ul.modules').html Handlebars.VM.template(JST['sidebar-modules']) this

  render: () =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super