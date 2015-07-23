import Ember from 'ember';

// Returns a Bootstrap background color classname depending on the
// user state

export function userStateColor(params) {
  switch(params[0]){
    case 'confirmed':
    return 'success';
    case 'unconfirmed':
    return 'warn';
    case 'error':
    return 'error';
    default:
    return '';
  }
}

export default Ember.Helper.helper(userStateColor);
