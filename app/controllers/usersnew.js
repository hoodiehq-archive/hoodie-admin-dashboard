import Ember from 'ember';

export default Ember.Controller.extend({
  searchTerm: '',
  activeSearch: '',
  pageLength: 20,
  skipFactor: 0,
  sortBy: 'created-at',
  sortDesc: true,
  deletingUser: false,
  selectedUser: undefined,
  newUsers: 0,

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

  previous: function () {
    var newSkipFactor = this.get('skipFactor') - 1;
    if(newSkipFactor < 0){
      newSkipFactor = 0;
    }
    this.set('skipFactor', newSkipFactor);
    this.send("updateUserList");
  },
  next: function () {
    this.set('skipFactor', this.get('skipFactor') + 1);
    this.send("updateUserList");
  },

  // We let some actions bubble up to the route by returning 'true',
  // so that the route can refresh the model.
  actions: {
    updateUserList: function () {
      this.set('newUsers', 0);
      return true;
    },
    search: function () {
      this.set('skipFactor', 0);
      this.set('activeSearch', this.get('searchTerm'));
      this.send("updateUserList");
      return false;
    },
    clearSearch: function () {
      this.set('skipFactor', 0);
      this.set('activeSearch', '');
      this.set('searchTerm', '');
      this.send("updateUserList");
      return false;
    },
    changePage: function (direction) {
      if(direction === 'previous'){
        this.previous();
      } else {
        this.next();
      }
      this.send("updateUserList");
      return false;
    },
    sortBy: function (sortBy) {
      // If it's a double click we're probably flipping the sort order
      if(sortBy === this.get('sortBy')){
        this.toggleProperty('sortDesc');
      } else {
        this.set('sortBy', sortBy);
      }
      this.send("updateUserList");
      return false;
    },
    promptToDeleteUser: function (user) {
      this.setProperties({
        'deletingUser': true,
        'selectedUser': user
      });
    },
    deleteUser: function (model) {
      var self = this;
      window.hoodieAdmin.user.remove('user', model.value.name).then(function(){
        self.send("updateUserList");
      });
      return false;
    },
    // Also handles cleanup after deleting
    cancelDelete: function (user) {
      this.setProperties({
        'deletingUser': false,
        'selectedUser': undefined
      });
    }
  }
});
