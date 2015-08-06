import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

/*

Fetches all plugins from the Hoodie API, adds the `id` key to them,
and wraps them in a root element for easier consumption with Ember

Also fetches the app's config object at the same time and munges everything together

*/

export default AuthenticatedRoute.extend({

  model: function() {

    // The old appconfig that contains stuff like additional_user_dbs
    var appConfig = Ember.$.getJSON('/_api/app/config').then(function(data) {
      data.id = data._id;
      return data;
    });

    // The new, currently mocked config API (See /server/mocks/config.js)
    var config = Ember.$.getJSON('/_api/_config').then(function(data) {
      data.id = data._id;
      return data.config;
    });

    var plugins = Ember.$.getJSON('/_api/_plugins').then(function(data) {
      var activePlugins = [];
      var ignoreablePlugins = ['users', 'email'];
      Ember.$.each(data, function (index, plugin) {
        // We don't want the users-plugin to show up twice, so we ignore
        // it when the server returns the plugin list, because we're
        // doing the UI for that in this app
        if(Ember.$.inArray(plugin.name, ignoreablePlugins) === -1 ){
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
      appConfig: appConfig,
      config: config,
      plugins: plugins
    };

    return Ember.RSVP.hash(promises).then(function(data) {
      return data;
    });
  }
});
