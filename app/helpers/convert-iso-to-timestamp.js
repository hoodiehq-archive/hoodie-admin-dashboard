import Ember from 'ember';

export function convertISOToTimestamp(ISODate) {
  if(ISODate){
    return new Date(ISODate).getTime();
  } else {
    return '';
  }
}

export default Ember.Helper.helper(convertISOToTimestamp);
