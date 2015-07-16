import Ember from 'ember';
import AuthenticatedRoute from '../authenticated';

/*

Fetches all plugins from the Hoodie API, adds the `id` key to them,
and wraps them in a root element for easier consumption with Ember.

Then returns the plugin specified in the `post_id` URL segment.

*/

export default AuthenticatedRoute.extend({
  model: function(params) {
    return Ember.$.getJSON('/_api/_plugins').then(function(plugins) {
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
