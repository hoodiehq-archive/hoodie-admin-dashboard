import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON('/_api/app/config').then(function(data) {
      data.id = data._id;
      // Set model defaults in case the plugin has never run before
      data.config.fromEmail = data.config.fromEmail || '';
      data.config.emailService = data.config.emailService || '';
      data.config.emailUsername = data.config.emailUsername || '';
      data.config.emailPassword = data.config.emailPassword || '';
      return data;
    });
  },
  actions:{
    updateEmailSettings: function () {
      var route = this;
      var controller = route.controller;
      // Fetch the current config state
      window.hoodieAdmin.request('GET', '/app/config')
      .done(function(config){
        var model = route.controller.get('model');
        // Merge the current config and the model together
        Ember.merge(config, model);
        // Save the new config
        window.hoodieAdmin.request('PUT', '/app/config', {data: JSON.stringify(config)})
        .done(function(){
          controller.set('submitMessage', 'Saved email settings successfully!');
        }).fail(function(error){
          console.log('error: ',error);
          controller.set('submitMessage', 'Error: '+error.status+' - '+error.responseText);
        });
      }).fail(function(error){
        console.log('error: ',error);
      });
      return false;
    }
  }
});
