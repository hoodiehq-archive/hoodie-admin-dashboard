var BaseModel = require('../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    app: {
      name: 'pocket',
      components: {
        'layout': {
          config: {
            template: null
          }
        },
        'sidebar': {
          config: {
            template: null
          }
        },
        'index': {
          config: { }
        }
      }
    },

    api: {
      token: null,
      url: 'http://localhost:4444/_api/',
      headers: {
        'x-api-version' : '2.1'
      }
    },

    ajax: {
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      timeout: 10000,
      cache: true,
      async: true
    },

    debug: true
  }

});

module.exports = Model;
