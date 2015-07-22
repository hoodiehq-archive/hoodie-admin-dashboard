import Ember from 'ember';
import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  // necessary, because ember doesn't pick up
  // controllers/plugins/usersnew correctly
  controllerName: 'usersnew',
  model: function () {
    var controller = this.controllerFor('usersnew');
    var url = '/_api/_users/_design/hoodie-plugin-users/_view/by-'+controller.get('sortBy')+'?descending='+controller.get('sortDesc')+'&limit='+controller.get('pageLength');
    if(controller.get('activeSearch')){
      url = '/_api/_users/_design/hoodie-plugin-users/_view/by-name?descending=false&limit='+controller.get('pageLength')+'&startkey="'+controller.get('activeSearch')+'"'+'&endkey="'+controller.get('activeSearch')+'\ufff0"';
    }
    return Ember.$.getJSON(url).then(function(users) {

      var result = {
        'users': users.rows,
        'totalUsers': users.total_rows,
      };

      return result;
    });
  },

  // We let the actions bubble up from the controller by returning 'true' there,
  // so that this route can refresh the model.
  actions: {
    updateUserList: function () {
      this.refresh();
      return false;
    },
    search: function () {
      this.refresh();
      return false;
    },
    clearSearch: function () {
      this.refresh();
      return false;
    },
    sortBy: function (sortBy) {
      this.refresh();
      return false;
    }
  }
});
