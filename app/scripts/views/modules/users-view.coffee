class Pocket.ModulesView['module-users'] extends Pocket.ModulesBaseView
  template: 'modules/users'


  update : ->
    window.hoodie.admin.users.store.findAll().then (users) =>
      @users = users
      @render()
