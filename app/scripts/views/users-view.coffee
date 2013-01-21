class pocket.Views.usersView extends Backbone.View
  template: 'users'

  initialize: ->
    super
    @setElement( $('.main') )

  active: ->
    @loadUsers()

  loadUsers: ->
    window.hoodie.admin.users.findAll().then(@render)

  render: (@users) =>
    @$el.html pocket.Templates[@template](window.Handlebars, this)
    super