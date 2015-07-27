import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

/*

Fetches all plugins from the Hoodie API, adds the `id` key to them,
and wraps them in a root element for easier consumption with Ember

Also fetches the app's config object at the same time and munges everything together

*/

export default AuthenticatedRoute.extend({

  model: function() {

    var config = Ember.$.getJSON('/_api/app/config').then(function(data) {
      data.id = data._id;
      return data;
    });

    var plugins = Ember.$.getJSON('/_api/_plugins').then(function(data) {
      Ember.$.each(data, function (index, plugin) {
        // We don't want the users-plugin to show up twice, so we ignore
        // it when the server returns the plugin list, because we're
        // doing the UI for that in this app
        if(plugin.id === 'hoodie-plugin-users'){
          data.splice(index,1);
        } else {
          plugin.id = plugin.name;
        }
      });
      var plugins = {
        plugins: data
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
