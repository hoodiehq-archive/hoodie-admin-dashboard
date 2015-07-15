import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'login',
  logout: function(){
    this.get('controllers.login').set('token', null);
    this.transitionToRoute('login');
  }
});
