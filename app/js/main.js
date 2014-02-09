/*jshint -W079 */
var Config = require('./models/config');
var app = require('./helpers/namespace');

require('./helpers/storage/store');
require('./helpers/handlebars');

require('./components/structural/layout/index');
require('./components/structural/sidebar/index');
require('./components/structural/content/index');

require('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;

