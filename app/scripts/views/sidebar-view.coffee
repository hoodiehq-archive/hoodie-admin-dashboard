class pocket.Views.sidebarView extends Backbone.View
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

  loadUserTotal: ->
    window.hoodie.admin.users.total().then(@renderUserTotal)

  renderUserTotal: (@userTotal) =>
    @$el.find('li.users .badge').text @userTotal

  loadAppName: ->
    window.hoodie.admin.app().then(@renderAppName)

  renderAppName: (@appInfo) =>
    @$el.find('header h1 a').text @appInfo.name

  render: () =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super