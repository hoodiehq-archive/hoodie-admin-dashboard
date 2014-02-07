'use strict';

var Router = Backbone.Router.extend({

  routes: {
    ''                      : 'tiles',
    'plugins/:id'           : 'tiles',
    '*defaults'             : 'tiles'
  },

  tiles: function (id, action) {
    app.vent.trigger('tiles', id, action);
  },

});

module.exports = Router;
