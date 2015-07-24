import Ember from 'ember';
import AuthenticatedRoute from '../../authenticated';

export default AuthenticatedRoute.extend({
  model: function(params) {
    var url = '/_api/_users/org.couchdb.user%3Auser%2F'+params.user_id;
    return Ember.$.getJSON(url).then(function(user) {
      user.proper_name = user.name.replace('user/', '');
      return user;
    });
  }
});
