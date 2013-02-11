# Hoodie.AdminModules
# =====================

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
