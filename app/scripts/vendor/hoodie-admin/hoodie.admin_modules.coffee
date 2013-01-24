# Hoodie.AdminModules
# =====================

#
class Hoodie.AdminModules

  constructor: (@hoodie, @admin) ->
    #


  findAll: (options) =>
    modules = [
      name: "worker-email-out"
      status: "success"
    ,
      name: "worker-user-databases"
      status: "success"
    ,
      name: "worker-email-signup-confirmation"
      status: "error"
      messages: [
        "Dummy error message"
        "Dummy error message"
      ]
    ,
      name: "worker-password-reset"
      status: "success"
    ,
      name: "worker-username-change"
      status: "warning"
    ,
      name: "worker-log"
      status: "error"
      messages: [
        "Dummy error message"
        "Dummy error message"
      ]
    ]
    @hoodie.resolveWith(modules)
