if (location.hostname is 'localhost')
  # debug mode, connect to
  # some existing hoodie app.
  whereTheMagicHappens = "http://api.pocket.dev"
else
  whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api")
window.hoodie = new Hoodie(whereTheMagicHappens)

# configure Backbone Layoutmanager
Backbone.Layout.configure

  # augment Backbone Views
  manage: true

  # get precompiled Handlebars template
  fetch: (path) ->
    Handlebars.VM.template(JST[path])

# init when page loaded
jQuery(document).ready ->
  new Pocket
