import Ember from 'ember';
import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    var url = '/_api/_plugins';
    return Ember.$.getJSON(url).then(function(plugins) {
      Ember.$.each(plugins, function (index, plugin) {
        plugin.id = plugin.name;
      });
      var matchingPlugins = Ember.$.grep(plugins, function (plugin) {
        return plugin.name === params.plugin_id;
      });
      return matchingPlugins[0];
    });
  }
});
