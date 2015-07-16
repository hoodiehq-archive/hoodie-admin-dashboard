import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'name'/*,
  extractSingle: function(store, typeClass, payload, id) {
    console.log('id: ',id);
    console.log('payload: ',payload);
    console.log('typeClass: ',typeClass);
    console.log('store: ',store);
    var comments = payload._embedded.comment;
    delete payload._embedded;

    payload = { comments: comments, post: payload };
    return this._super(store, typeClass, payload, id);
  },
  extractArray: function (store, primaryType, payload) {
      var primaryTypeName = primaryType.modelName;
      var data = {};
      data[primaryTypeName.pluralize()] = payload;
      console.log(JSON.stringify(data));
      payload = data;

      return this._super.apply(store, primaryType, payload);
  }*/
});
