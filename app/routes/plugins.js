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
        plugin.id = plugin.name;
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
      console.log('1. PLUGINS data: ',data);
      return data;
    });
  }
});
