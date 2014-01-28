var Hapi = require('hapi');

var app = new Hapi.Server('localhost', 4444);

module.exports = app;
