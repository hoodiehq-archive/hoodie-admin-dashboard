import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

/*

Fetches all plugins from the Hoodie API, adds the `id` key to them,
and wraps them in a root element for easier consumption with Ember

Also fetches the app's config object at the same time and munges everything together

*/

export default AuthenticatedRoute.extend({
  ignorablePlugins: ['users', 'email'],
  model: function() {

    var route = this;

    var config = Ember.$.getJSON('/_api/app/config').then(function(data) {
      data.id = data._id;
      return data;
    });

    var plugins = Ember.$.getJSON('/_api/_plugins').then(function(data) {
      var activePlugins = [];
      Ember.$.each(data, function (index, plugin) {
        // We don't want these plugins to show up twice, so we ignore
        // them when the server returns the plugin list, because we're
        // doing the UI for them in this app
        if(route.get('ignorablePlugins').indexOf(plugin.name) === -1){
          plugin.id = plugin.name;
          activePlugins.push(plugin);
        }
      });
      var plugins = {
        plugins: activePlugins
      };
      return plugins;
    });

    var promises = {
      config: config,
      plugins: plugins
    };

    return Ember.RSVP.hash(promises).then(function(data) {
      return data;
    });
  }
});
