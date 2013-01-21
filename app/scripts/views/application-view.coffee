class pocket.Views.applicationView extends Backbone.View
  template: 'application'

  initialize: ->
    super

    @setElement( $('html') )

  render: ->
    @$el.html pocket.Templates[@template](this)
    super
