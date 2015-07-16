import Ember from 'ember';

export default Ember.Controller.extend({
  logout: function(){
    window.hoodieAdmin.account.signOut();
    this.transitionToRoute('login');
  }
});
