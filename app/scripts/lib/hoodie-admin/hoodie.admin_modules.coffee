# Hoodie.AdminModules
# =====================

MODULES = [
  name: "users"
  status: "success"
,
  name: "sharings"
  status: "success"
,
  name: "email-out"
  status: "success"
,
  name: "logs"
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

  getConfig : (moduleName) ->
    @hoodie.resolveWith
      email:
          transport:
              host: "",
              port: 465,
              auth:
                  user: "@gmail.com",
                  pass: ""
              secureConnection: true,
              service: "Gmail"

  setConfig : (moduleName, config = {}) ->
    @hoodie.resolveWith(config)
