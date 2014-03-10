/*jshint -W079 */
var Config = require('./models/config');
var app = require('./helpers/namespace');

require('./helpers/storage/store');
require('./helpers/handlebars');

// start the pocket component
require('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;

