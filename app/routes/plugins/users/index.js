import Ember from 'ember';
import AuthenticatedRoute from '../../authenticated';

export default AuthenticatedRoute.extend({
  // necessary, because ember doesn't pick up
  // controllers/plugins/users correctly
  controllerName: 'users',
  update_seq: '',
  pollster: undefined,
  model: function () {
    var route = this;
    var controller = this.controllerFor('users');
    var skip = controller.get('skipFactor') * controller.get('pageLength');
    var url = '/_api/_users/_design/views/_view/by-'+controller.get('sortBy')+'?descending='+controller.get('sortDesc')+'&limit='+controller.get('pageLength')+'&skip='+skip+'&update_seq=true';

    if(controller.get('activeSearch')){
      url = '/_api/_users/_design/views/_view/by-name?descending=false&limit='+controller.get('pageLength')+'&startkey="'+controller.get('activeSearch')+'"'+'&endkey="'+controller.get('activeSearch')+'\ufff0"&skip='+skip;
    }

    // Fetch config data to populate 'additional databases'-input
    var baseModel = this.modelFor('plugins');
    if(baseModel.appConfig.config.additional_user_dbs){
      controller.set('additionalDatabases', baseModel.appConfig.config.additional_user_dbs.join(', '));
    }

    return Ember.$.getJSON(url).then(function(users) {
      route.set('update_seq', users.update_seq);
      var result = {
        'users': users.rows,
        'totalUsers': users.total_rows
      };

      return result;
    });
  },

  afterModel: function () {
    this.pollUserChangesFeed();
  },

  pollUserChangesFeed: function () {
    var controller = this.controllerFor('users');
    // If we have an update_seq, poll the changes feed every 30 seconds
    if(this.get('update_seq')){
      var interval = 1000 * 30;
      var url = '_api/_users/_changes?since='+this.get('update_seq');

      this.pollster = Ember.run.later(this, function() {
        this.pollUserChangesFeed();
        return Ember.$.getJSON(url).then(function(users) {
          // save the current number of new users if their revisions are <=2
          // This includes new users and those that have been auto-confirmed
          // (hence the second revision). This isn't future proof, plugins might
          // do more stuff to users immediately upon signup.
          // This feature will then simply stop working, but nothing will break.
          var newUsers = Ember.$.map(users.results, function(user){
            var revIndex = parseInt(user.changes[0].rev.split('-')[0]);
            if(revIndex <= 2){
              return user;
            } else {
              return null;
            }
          });
          controller.set('newUsers', newUsers.length);
        });
      }, interval);
    }
  },

  cleanupPolling: function () {
    Ember.run.cancel(this.pollster);
    this.setProperties({
      'update_seq': ''
    });
  },

  // We let some actions bubble up from the controller by returning 'true' there,
  // so that this route can refresh the model.
  actions: {
    updateUserList: function () {
      this.cleanupPolling();
      this.refresh();
      return false;
    },
    updateAdditionalDatabases: function () {
      var controller = this.controllerFor('users');
      var dbArray = controller.get('additionalDatabases').replace(/ /g, "").split(",");

      window.hoodieAdmin.request('GET', '/app/config')
      .done(function(appConfig){
        appConfig.config.additional_user_dbs = dbArray;
        window.hoodieAdmin.request('PUT', '/app/config', {data: JSON.stringify(appConfig)})
        .done(function(){
          controller.set('addDatabasesSubmitMessage', 'Saved <strong>'+dbArray.join(', ')+'</strong> successfully!');
        }).fail(function(error){
          console.log('error: ',error);
          controller.set('addDatabasesSubmitMessage', 'Error: '+error.status+' - '+error.responseText);

        });
      }).fail(function(error){
        console.log('error: ',error);
      });
      return false;
    }
  },
  deactivate: function () {
    this.cleanupPolling();
  }
});
