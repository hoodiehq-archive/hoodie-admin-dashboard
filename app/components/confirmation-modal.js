import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    confirm: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    console.log('this: ',this);
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('cancel');
    }.bind(this));
  }.on('didInsertElement')
});
