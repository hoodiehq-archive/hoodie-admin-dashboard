import Ember from 'ember';

export default Ember.Component.extend({
  model: 'test',
  actions: {
    confirm: function() {
      this.$('.modal').modal('hide');
      this.sendAction('confirm', this.get('model'));
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('cancel');
    }.bind(this));
  }.on('didInsertElement')
});
