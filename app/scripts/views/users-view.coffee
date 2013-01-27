class pocket.Views.UsersView extends pocket.Views.BaseView
  template: 'users'

  initialize: ->
    super
    @setElement( $('.main') )

  active: ->
    if pocket.isAuthenticated
      @loadUsers()
    else
      pocket.router.navigate '/'

  loadUsers: ->
    window.hoodie.admin.users.store.findAll().then(@render)

  render: (@users) =>
    @$el.html Handlebars.VM.template(JST[@template]) this
    super
