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

###
Handlebars.registerHelper('render_handlebars', function(name, context) {
  # we need the sub template compiled here
  # in order to be able to generate the top level template
  var subTemplate =  Handlebars.compile($('#' + name).html());
  var subTemplateContext = $.extend({},this,context.hash);
  return new Handlebars.SafeString(subTemplate(subTemplateContext));
});
###

window.pocket =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  registerHandlebarsHelpers: ->
    Handlebars.registerHelper 'testHelper', (name, context) ->
      return "HANDLEBARS TESTHELPER"
  init: ->
    @registerHandlebarsHelpers()
    console.log "Hello from Backbone! Woop"
    @router = new pocket.Routers.ApplicationRouter
    @app = new pocket.Views.applicationView
    Backbone.history.start()

window.escapeExpression = Handlebars.Utils.escapeExpression

$(document).ready ->
  pocket.init()
