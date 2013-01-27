(function() {
  var whereTheMagicHappens,
    _this = this;

  if (location.hostname === 'localhost') {
    whereTheMagicHappens = "http://api.pocket.dev";
  } else {
    whereTheMagicHappens = location.protocol + "//" + location.hostname.replace(/^admin/, "api");
  }

  window.hoodie = new Hoodie(whereTheMagicHappens);

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
      $("body").on("change", ".formCondition", function(event) {
        return _this.handleConditionalFormElements(event.target);
      });
      return $("body").on("click", "a.signOut", function(event) {
        event.preventDefault();
        return hoodie.admin.signOut().done(_this.onSignOutSuccess).fail(_this.onSignOutFail);
      });
    },
    registerHandlebarsHelpers: function() {
      return Handlebars.registerHelper('testHelper', function(name, context) {
        return "HANDLEBARS TESTHELPER";
      });
    },
    init: function() {
      var _this = this;
      this.registerHandlebarsHelpers();
      this.registerListeners();
      return hoodie.admin.authenticate().then(this.onAuthenticated, this.onUnauthenticated).then(function() {
        _this.router = new pocket.Routers.ApplicationRouter;
        _this.app = new pocket.Views.ApplicationView;
        return Backbone.history.start();
      });
    },
    onAuthenticated: function() {
      pocket.isAuthenticated = true;
      return $('body').addClass('authenticated');
    },
    onUnauthenticated: function() {
      pocket.isAuthenticated = false;
      return _this.hoodie.resolveWith();
    },
    onSignOutSuccess: function() {
      return window.location = '/';
    },
    onSignOutFail: function() {
      return console.log("I'm sorry Dave, I can't let you do that.");
    }
  };

  window.escapeExpression = Handlebars.Utils.escapeExpression;

  $(document).ready(function() {
    return pocket.init();
  });

}).call(this);
