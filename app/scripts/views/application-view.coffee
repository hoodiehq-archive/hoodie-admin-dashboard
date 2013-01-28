class Pocket.ApplicationView extends Pocket.BaseView

  events:
    "click a"       : "handleLinks"

  views:
    "body" : new Pocket.MainView

  initialize: ->
    super

    @setElement( $('html') )
    if pocket.isAuthenticated
      @views.body.template = 'main'
    else
      @views.body.template = 'signin'
    @render()


  handleLinks: (event) ->
    path = $(this).attr 'href'
    if /\.pdf$/.test path
      return true
    if /^\/[^\/]/.test(path)
       router.navigate path.substr(1), true
       return false
