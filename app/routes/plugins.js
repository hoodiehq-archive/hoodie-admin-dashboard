import Ember from 'ember';
import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    var plugins = this.store.findAll('plugin');
    return plugins;
  },
  afterModel: function (plugins) {
    var m = Ember.inspect(plugins);
    console.log('m: ',m);
  }
});
