import Ember from 'ember';

export default Ember.Controller.extend({
  searchTerm: '',
  activeSearch: '',
  pageLength: 5,
  skipFactor: 0,
  sortBy: 'created-at',
  sortDesc: true,

  pageNumber: function () {
    return this.get('skipFactor') + 1;
  }.property('skipFactor', 'pageLength'),

  isLastPage: function () {
    if(this.model.users.length < this.get('pageLength')){
      return true;
    } else {
      return false;
    }
  }.property('skipFactor', 'pageLength', 'model'),

  // We let the actions bubble up to the route by returning 'true',
  // so that the route can refresh the model.
  actions: {
    updateUserList: function () {
      return true;
    },
    search: function () {
      this.set('skipFactor', 0);
      this.set('activeSearch', this.get('searchTerm'));
      return true;
    },
    clearSearch: function () {
      this.set('skipFactor', 0);
      this.set('activeSearch', '');
      this.set('searchTerm', '');
      return true;
    },
    previous: function () {
      var newSkipFactor = this.get('skipFactor') - 1;
      if(newSkipFactor < 0){
        newSkipFactor = 0;
      }
      this.set('skipFactor', newSkipFactor);
      return true;
    },
    next: function () {
      this.set('skipFactor', this.get('skipFactor') + 1);
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
