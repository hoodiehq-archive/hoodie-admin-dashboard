import Ember from 'ember';

export function linkToFutonUser(userName) {
  // FIX: linking to Futon doesn't work when using `ember serve --proxy http://localHoodieEndpoint`

  // FIX: linking to Futon also doesn't work inside the deployed app, since
  // http://appEndpoint/_api/_utils !== http://CouchDBEndpoint/_utils

  return window.location.origin + '/_utils/document.html?_users/org.couchdb.user%3Auser%2F' + userName;
}

export default Ember.Helper.helper(linkToFutonUser);
