(function() {
  var whereTheMagicHappens;

  whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api");

  window.hoodie = new Hoodie(whereTheMagicHappens);

  /*
  hoodie.request("GET", "/").done((data) ->
    console.log "hoodie is a go."
    console.log data
  ).fail (error) ->
    console.log "hoodie has an error."
    console.log error
  */


  window.pocket = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    handleConditionalFormElements: function(el, speed) {
      var condition, conditions, requirement, requirementMet, target, _i, _len, _results;
      if (speed == null) {
        speed = 250;
      }
      conditions = $(el).data("conditions");
      conditions = conditions.split(',');
      _results = [];
      for (_i = 0, _len = conditions.length; _i < _len; _i++) {
        condition = conditions[_i];
        requirement = condition.split(':')[0];
        target = condition.split(':')[1];
        requirementMet = false;
        if ($(el).is('input[type=checkbox]')) {
          if ($(el).is(':checked') && requirement === "true") {
            requirementMet = true;
          }
          if (!$(el).is(':checked') && requirement === "false") {
            requirementMet = true;
          }
        }
        if ($(el).val() === requirement) {
          requirementMet = true;
        }
        if (requirementMet) {
          _results.push($(target).slideDown(speed));
        } else {
          _results.push($(target).slideUp(speed));
        }
      }
      return _results;
    },
    registerListeners: function() {
      var _this = this;
      return $("body").on("change", ".formCondition", function(event) {
        return _this.handleConditionalFormElements(event.target);
      });
    },
    registerHandlebarsHelpers: function() {
      return Handlebars.registerHelper('testHelper', function(name, context) {
        return "HANDLEBARS TESTHELPER";
      });
    },
    init: function() {
      this.registerHandlebarsHelpers();
      this.registerListeners();
      console.log("Hello from Backbone! Woop");
      this.router = new pocket.Routers.ApplicationRouter;
      this.app = new pocket.Views.applicationView;
      return Backbone.history.start();
    }
  };

  window.escapeExpression = Handlebars.Utils.escapeExpression;

  $(document).ready(function() {
    return pocket.init();
  });

}).call(this);
