import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    var url = '/_api/_plugins';
    return Ember.$.getJSON(url).then(function(data) {
      Ember.$.each(data, function (index, plugin) {
        plugin.id = plugin.name;
      });
      var plugins = {
        plugins: data
      };
      return plugins;
    });
  }
});
