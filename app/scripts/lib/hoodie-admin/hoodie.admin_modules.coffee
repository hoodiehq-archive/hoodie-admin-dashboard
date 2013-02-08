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
class Hoodie.AdminModules extends Hoodie.Remote

  name   : 'modules'

  constructor: (@hoodie, @admin) ->
    #
    super


  find: (moduleName) =>
    if moduleName is 'module'
      debugger

    super "module", moduleName


  findAll: =>
    super 'module'

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
