var Hapi = require('hapi');
var path = require('path');

var app = new Hapi.Server('localhost', 4444);

app.route([
  {
    method: 'GET',
    path: '/_api/_plugins',
    handler: function (req, reply) {
      reply.file(path.resolve('./data/plugins.json'));
    }
  }
]);

module.exports = app;
