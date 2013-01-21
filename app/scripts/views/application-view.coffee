class pocket.Views.applicationView extends Backbone.View

  events:
    "click a"       : "handleLinks"

  initialize: ->
    super

    @setElement( $('html') )
    @dashboard = new pocket.Views.dashboardView
    @users = new pocket.Views.usersView

  handleLinks: (event) ->
    path = $(this).attr 'href'
    if /\.pdf$/.test path
      return true
    if /^\/[^\/]/.test(path)
       router.navigate path.substr(1), true
       return false

