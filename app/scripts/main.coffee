whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api")
window.hoodie = new Hoodie(whereTheMagicHappens)
###
hoodie.request("GET", "/").done((data) ->
  console.log "hoodie is a go."
  console.log data
).fail (error) ->
  console.log "hoodie has an error."
  console.log error
###

window.pocket =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    console.log "Hello from Backbone! Woop"
    view = new pocket.Views.applicationView
    #view.render()

$(document).ready ->
  pocket.init()
