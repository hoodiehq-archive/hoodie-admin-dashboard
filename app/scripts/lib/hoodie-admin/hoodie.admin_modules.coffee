# Hoodie.AdminModules
# =====================

MODULES = [
  name: "email-out"
  status: "success"
,
  name: "user-databases"
  status: "success"
,
  name: "email-signup-confirmation"
  status: "error"
  messages: [
    "Dummy error message"
    "Dummy error message"
  ]
,
  name: "password-reset"
  status: "success"
,
  name: "username-change"
  status: "warning"
,
  name: "log"
  status: "error"
  messages: [
    "Dummy error message"
    "Dummy error message"
  ]
]

#
class Hoodie.AdminModules

  constructor: (@hoodie, @admin) ->
    #


  find: (moduleName) =>
    defer = @hoodie.defer()

    for module in MODULES
      if module.name is moduleName
        return defer.resolve(module)

    defer.reject()

    return defer.promise()


  findAll: (options) =>
    @hoodie.resolveWith(MODULES)
