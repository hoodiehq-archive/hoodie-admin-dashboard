import Ember from 'ember';

export function isActiveTableHeader(params) {
  if(params[0] === params[1]){
    return 'active';
  } else {
    return null;
  }
}

export default Ember.Helper.helper(isActiveTableHeader);
