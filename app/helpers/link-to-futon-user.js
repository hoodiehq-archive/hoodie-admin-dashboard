import Ember from 'ember';

export function linkToFutonUser(userName) {
  return window.location.origin + '/_api/_utils/document.html?_users/org.couchdb.user:' + userName;
}

export default Ember.Helper.helper(linkToFutonUser);
