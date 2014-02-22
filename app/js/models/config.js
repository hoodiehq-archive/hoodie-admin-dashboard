var BaseModel = require('../helpers/mvc/model');

var Model = BaseModel.extend({

  // TODO: the below should be extended by appconfig
  defaults: {
    app: {
      name: 'appname',
      components: {
        'layout': {
          config: {
            template: '../templates/index.hbs'
          }
        },
        'sidebar': {
          config: {
            template: null
          }
        },
        'content': {
          config: { }
        }
      }
    },

    api: {
      url: 'http://localhost:6021/_api/'
    },

    ajax: {
      timeout: 10000,
      cache: true,
      async: true
    },

    debug: true
  }

});

module.exports = Model;
