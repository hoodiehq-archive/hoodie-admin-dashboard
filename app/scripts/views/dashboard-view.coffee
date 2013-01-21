class pocket.Views.dashboardView extends Backbone.View
  template: 'dashboard'

  initialize: ->
    super

    @setElement( $('.main') )
    @loadStats()

  loadStats: ->
    window.hoodie.admin.stats().then(@render)

  render: (@stats) =>
    @$el.html pocket.Templates[@template](window.Handlebars, {title: "hello"})
    super