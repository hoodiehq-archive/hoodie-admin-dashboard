// Custom rest adapter so ember can speak to the Hoodie endpoint

import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  // set the path for Hoodie's REST API, since ember expects `api`
  namespace: '_api',
  // ember will look for `plugins`, but we have `_plugins`
  pathForType: function (type) {
    if(type === 'plugin'){
      return '_plugins';
    }
  }
});
