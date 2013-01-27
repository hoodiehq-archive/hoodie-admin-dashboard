(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  pocket.Views.ModulesView = (function(_super) {

    __extends(ModulesView, _super);

    function ModulesView() {
      this.render = __bind(this.render, this);
      return ModulesView.__super__.constructor.apply(this, arguments);
    }

    ModulesView.prototype.template = 'modules';

    ModulesView.prototype.initialize = function() {
      ModulesView.__super__.initialize.apply(this, arguments);
      return this.setElement($('.main'));
    };

    ModulesView.prototype.active = function(params) {
      if (pocket.isAuthenticated) {
        return this.loadModules();
      } else {
        return pocket.router.navigate('/');
      }
    };

    ModulesView.prototype.loadModules = function() {
      return window.hoodie.admin.modules.findAll().then(this.render);
    };

    ModulesView.prototype.render = function(modules) {
      var key, module, _ref;
      this.modules = modules;
      _ref = this.modules;
      for (key in _ref) {
        module = _ref[key];
        module.url = module.name.replace('worker-', '');
        module.cleanName = this.makeURLHuman(module.url);
        if (JST["modules/" + module.name]) {
          module.formHTML = Handlebars.VM.template(JST["modules/" + module.name])(this);
        }
      }
      this.$el.html(Handlebars.VM.template(JST[this.template])(this));
      $('.formCondition').each(function(index, el) {
        return pocket.handleConditionalFormElements(el, 0);
      });
      return ModulesView.__super__.render.apply(this, arguments);
    };

    return ModulesView;

  })(pocket.Views.BaseView);

}).call(this);
