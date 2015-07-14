export default Ember.Route.extend({
  model: function() {
    return {
      pluginList: [{
          id: 'hoodie-plugin-user'
        },{
          id: 'hoodie-plugin-appconfig'
        }
      ]
    };
  }
});
