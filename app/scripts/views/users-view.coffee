class pocket.Views.usersView extends pocket.Views.baseView
  template: 'users'

  initialize: ->
    super
    @setElement( $('.main') )

  active: ->
    @loadUsers()

  loadUsers: ->
    window.hoodie.admin.users.store.findAll().then(@render)

  render: (@users) =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super
