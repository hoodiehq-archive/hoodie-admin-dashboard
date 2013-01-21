class pocket.Views.applicationView extends Backbone.View

  initialize: ->
    super

    @setElement( $('html') )
    new pocket.Views.dashboardView

