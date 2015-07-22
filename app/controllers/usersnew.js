import Ember from 'ember';

export default Ember.Controller.extend({
  searchTerm: '',
  activeSearch: '',
  pageLength: 5,
  sortBy: 'created-at',
  sortDesc: true,

  // We let the actions bubble up to the route by returning 'true',
  // so that the route can refresh the model.
  actions: {
    updateUserList: function () {
      return true;
    },
    search: function () {
      this.set('activeSearch', this.get('searchTerm'));
      return true;
    },
    clearSearch: function () {
      this.set('activeSearch', '');
      this.set('searchTerm', '');
      return true;
    },
    sortBy: function (sortBy) {
      // If it's a double click we're probably flipping the sort order
      if(sortBy === this.get('sortBy')){
        this.toggleProperty('sortDesc');
      } else {
        this.set('sortBy', sortBy);
      }
      return true;
    }
  }
});
