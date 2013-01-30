(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pocket.ModulesBaseView = (function(_super) {

    __extends(ModulesBaseView, _super);

    function ModulesBaseView() {
      return ModulesBaseView.__super__.constructor.apply(this, arguments);
    }

    ModulesBaseView.prototype.afterRender = function() {
      this.$el.find('.formCondition').each(function(index, el) {
        return pocket.handleConditionalFormElements(el, 0);
      });
      return ModulesBaseView.__super__.afterRender.apply(this, arguments);
    };

    return ModulesBaseView;

  })(Pocket.BaseView);

}).call(this);
