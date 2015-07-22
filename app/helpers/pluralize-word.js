import Ember from 'ember';
var pluralize = Ember.String.pluralize;

/*

  Pluralizes a given singular word depending on count. You can pass in
  the plural if it's so irregular that ember can't deal with it.

  Parameters:

  count (number):    Amount of the thing
  singular (string): Singular noun of the thing
  plural (string):   OPTIONAL Plural noun of the thing

*/

export function pluralizeWord(params) {
  var count = params[0];
  var singular = params[1];
  var plural = params[2];
  if (count === 1) {
    return singular;
  } else {
    if(plural){
      return plural;
    } else {
      return pluralize(singular);
    }
  }
}

export default Ember.Helper.helper(pluralizeWord);
