import Ember from 'ember';

export default Ember.Component.extend({
  disableNext: function () {
    return this.get('isLastPage');
  }.property('isLastPage'),

  disablePrevious: function () {
    if(this.get('pageNumber') === 1){
      return true;
    } else {
      return false;
    }
  }.property('pageNumber'),

  actions: {
    previous: function () {
      this.sendAction('action', 'previous');
      return false;
    },
    next: function () {
      this.sendAction('action', 'next');
      return false;
    },
  }
});
