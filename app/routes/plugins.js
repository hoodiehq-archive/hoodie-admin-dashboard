import AuthenticatedRoute from '../routes/authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    return {
      pluginList: [{
          id: 'hoodie-plugin-user',
          name: 'users'
        },{
          id: 'hoodie-plugin-appconfig',
          name: 'appconfig'
        }
      ]
    };
  }
});
