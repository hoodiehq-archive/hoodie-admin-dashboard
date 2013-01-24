class pocket.Views.applicationView extends pocket.Views.baseView

  events:
    "click a"       : "handleLinks"

  initialize: ->
    super

    @setElement( $('html') )

    window.hoodie.admin.app().then(@initViews)
    return null

  initViews: (@appInfo) =>
    # Set some basic app vars for use in any template
    pocket.appInfo = @appInfo;
    pocket.appInfo.defaultReplyMailAddress = @defaultReplyMail @appInfo.name
    # Get views
    @sidebar = new pocket.Views.sidebarView
    @dashboard = new pocket.Views.dashboardView
    @users = new pocket.Views.usersView
    @modules = new pocket.Views.modulesView
    return null

  handleLinks: (event) ->
    path = $(this).attr 'href'
    if /\.pdf$/.test path
      return true
    if /^\/[^\/]/.test(path)
       router.navigate path.substr(1), true
       return false

