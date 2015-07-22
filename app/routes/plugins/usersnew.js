import Ember from 'ember';
import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  init: function() {
    this.setProperties({
      pageLength: 5,
      sortBy: 'created-at',
      sortDesc: true,
      searchTerm: ''
    });
    this._super.apply(this, arguments);
  },
  model: function () {
    var route = this;
    var url = '/_api/_users/_design/hoodie-plugin-users/_view/by-'+this.get('sortBy')+'?descending='+this.get('sortDesc')+'&limit='+this.get('pageLength');
    if(this.get('searchTerm')){
      url = '/_api/_users/_design/hoodie-plugin-users/_view/by-name?descending=false&limit='+this.get('pageLength')+'&startkey="'+this.get('searchTerm')+'"'+'&endkey="'+this.get('searchTerm')+'\ufff0"';
    }
    return Ember.$.getJSON(url).then(function(users) {
      var resultsDesc = 'Currently displaying all '+users.total_rows+' users';
      switch(users.length){
        case 1:
          resultsDesc = 'You have a single user';
        break;
        case 0:
          resultsDesc = 'You have no users yet';
        break;
      }

      var result = {
        'users': users.rows,
        'totalUsers': users.total_rows,
        'resultsDesc': resultsDesc,
        'pageLength': route.get('pageLength'),
        'sortBy': route.get('sortBy'),
        'sortDesc': route.get('sortDesc'),
        'searchTerm': route.get('searchTerm')
      };

      return result;
    });
  },

  computed: function () {

  }.property('sortBy', 'sortDesc', 'searchTerm'),


  actions: {
    updateUserList: function () {
      this.refresh();
    },
    search: function () {
      this.set('searchTerm', this.currentModel.searchTerm);
      this.refresh();
      return false;
    },
    clearSearch: function () {
      this.set('searchTerm', '');
      this.refresh();
      return false;
    },
    sortBy: function (sortBy) {
      // If it's a double click we're probably flipping the sort order
      if(sortBy === this.get('sortBy')){
        this.toggleProperty('sortDesc');
      } else {
        this.set('sortBy', sortBy);
      }
      this.refresh();
      return false;
    }
  }
});
