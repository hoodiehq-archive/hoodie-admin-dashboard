/*jshint -W079 */
var Config = require('./models/config');
var app = require('./helpers/namespace');

// start the pocket component
require('./components/pocket/index');

require('./helpers/storage/store');
require('./helpers/handlebars');

app.start(new Config().toJSON());

module.exports = app;

