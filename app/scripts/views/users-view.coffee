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
    @$el.html Handlebars.VM.template(JST[@template]) this
    super
