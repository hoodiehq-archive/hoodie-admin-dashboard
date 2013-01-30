(function() {
  var whereTheMagicHappens;

  if (location.hostname === 'localhost') {
    whereTheMagicHappens = "http://api.pocket.dev";
  } else {
    whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api");
  }

  window.hoodie = new Hoodie(whereTheMagicHappens);

  Backbone.Layout.configure({
    manage: true,
    fetch: function(path) {
      return Handlebars.VM.template(JST[path]);
    }
  });

  jQuery(document).ready(function() {
    return new Pocket;
  });

}).call(this);
