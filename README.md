# Admin-dashboard

Ember version of the Hoodie Admin Dashboard. Currently lets you log in and out, fetch all the plugin info, display plugin backends, and is ready to handle requests to Hoodie that require authentication. All Ajax requests done through Ember will transmit the bearerToken correctly once the admin has signed in.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

This admin dashboard is meant to run in conjunction with an actual Hoodie app, so you'll need to tell Ember where the `WWW`-endpoint of that Hoodie app is. For example:

* `ember server --proxy http://127.0.0.1:6096`
* Visit your app at [http://localhost:4200](http://localhost:4200).

This'll handle all requests to the Hoodie API without any CORS trouble or additional config

### Oddities of Note

This app embeds **iframes**, the sources of which are provided by the proxied Hoodie API. This only works if the Ember environment variable `locationType` is set to `hash` in `config/environment.js`. Otherwise, Ember will expect a route handler for the iframe src, and that will mess everything up. This means that the app's URLs use hashes.

#### Working on admin-dashboard-UIKit

Clone `git@github.com:hoodiehq/hoodie-admin-dashboard-UIKit.git` and do `$ npm link` in its directory. This will make a global npm package named `hoodie-admin-dashboard-UIKit` available on your system.

Now go to `yourHoodieTestApp/node_modules/hoodie-server/node_modules` and do `$ npm link hoodie-admin-dashboard-UIKit`.

You can now work in your UIKit-folder and see the changes in your admin-dashboard's plugins. Don't forget to `$ grunt build` the UIKit first.

#### Working on a plugin

Clone the plugin and do `$ npm link` in its directory. This will make a global npm package named `hoodie-plugin-pluginName` available on your system.

If the plugin exists in npm already, you can install it now via `$ hoodie install pluginName`.

Now go to `yourHoodieTestApp/node_modules` and do `$ npm link hoodie-plugin-pluginName`.

If the plugin is new and not installable through `$hoodie install`, you will have to add it to the package.json manually.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

The app is built into `www` to match the path in the existing dashboard. It's set in `.ember-cli`.

### Release Process

TBD.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

