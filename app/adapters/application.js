import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: '_api',
  pathForType: function (type) {
    if(type === 'plugin'){
      return '_plugins';
    }
  }
});
