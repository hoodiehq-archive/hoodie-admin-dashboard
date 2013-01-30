(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesView = (function(_super) {

    __extends(ModulesView, _super);

    function ModulesView() {
      this.beforeRender = __bind(this.beforeRender, this);
      return ModulesView.__super__.constructor.apply(this, arguments);
    }

    ModulesView.prototype.template = 'module';

    ModulesView.prototype.beforeRender = function() {
      var view;
      this.module.url = this.module.id.replace('worker-', '');
      this.module.cleanName = this.makeURLHuman(this.module.url);
      this.appInfo = pocket.appInfo;
      if (this.getView(".module-content")) {
        this.removeView(".module-content");
      }
      if (this.moduleViewExists(this.module.id)) {
        view = this.getModuleView(this.module.id);
        this.setView(".module-content", view);
        return typeof view.update === "function" ? view.update() : void 0;
      }
    };

    ModulesView.prototype.moduleViewExists = function(name) {
      return Pocket.ModulesView["module-" + name] != null;
    };

    ModulesView.prototype._cachedViews = {};

    ModulesView.prototype.getModuleView = function(name) {
      if (!this._cachedViews[name]) {
        this._cachedViews[name] = new Pocket.ModulesView["module-" + this.module.id];
      }
      return this._cachedViews[name];
    };

    return ModulesView;

  })(Pocket.BaseView);

}).call(this);
