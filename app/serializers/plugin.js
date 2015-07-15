import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function (store, primaryType, payload) {
      var primaryTypeName = primaryType.modelName;
      console.log('primaryTypeName: ',primaryTypeName);
      var data = {};
      data['plugins'] = payload;
      console.log(JSON.stringify(data));
      payload = data;
      console.log('payload: ',payload);

      return this._super.apply(store, primaryType, payload);
  },
  primaryKey: 'name'
});
