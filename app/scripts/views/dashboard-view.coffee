class pocket.Views.dashboardView extends pocket.Views.baseView
  template: 'dashboard'

  initialize: ->
    super
    @setElement( $('.main') )

  active: ->
    @loadStats()

  loadStats: ->
    window.hoodie.admin.stats(1358610679).then(@render)

  render: (@stats) =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super
