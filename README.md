# Pocket rebuild

Static HTML for now. Currently includes a fluid version of gridster.js (check out https://github.com/espy/gridster.js/blob/master/README.md to see how that works).

Remember to `$ npm install` :)

Start dev server with `$ grunt server` and open `http://localhost:4444`.
You need the livereload plugin for Chrome if you want livereload.

Build CSS with `$ grunt compass`
Build JS with `$ grunt browserify`
Build everything with `$ grunt build`

# Setting up the dev environment

This will enable you to work on Pocket, pocket UIKit and plugins.

## Working on Pocket

For now, you will need a separate hoodie app to work as your backend. Let's call it `pocketBackend`. Just make it happen somewhere with `$ hoodie new pocketBackend`. pocketBackend's `hoodie-server` will need to be modified to allow CORS requests from the dev Pocket:

In `pocketBackend/node_modules/hoodie_server/lib/server/index.js`, insert

````
var cors = {
      origin: ['http://localhost:4444'],
      isOriginExposed: true,
      headers: ['Authorization', 'Content-Type', 'If-None-Match', 'access-control-allow-headers'],
      credentials: true
    };

    pack.server(server_config.www_port, {
      labels: ['web'],
      cors: cors
    });

    pack.server(server_config.admin_port, {
      labels: ['admin'],
      cors: cors
    });
````

underneath `var pack = new Hapi.Pack();`.

In your dev Pocket's `app/js/models/config.js`, there should be an `api` object that points to the Hoodie endpoint Pocket should be using. Your pocketBackend's www URL goes in here:

````
api: {
  url: 'http://127.0.0.1:6055/_api/'
},
````

You should now be able to run pocketBackend with `$ hoodie start` and your dev Pocket with `$ grunt server`, and they should happily talk to each other.

## Working on pocket-UIKit

Clone `git@github.com:hoodiehq/hoodie-pocket-UIKit.git` and do `$ npm link` in its directory. This will make a global npm package named `hoodie-pocket-UIKit` available on your system.

Now go to `pocketBackend/node_modules/hoodie-server/node_modules` and do `$ npm link hoodie-pocket-UIKit`.

You can now work in your UIKit-folder and see the changes in your Pocket's plugins. Don't forget to `$ grunt build` the UIKit first.

## Working on a plugin

Clone the plugin and do `$ npm link` in its directory. This will make a global npm package named `hoodie-plugin-pluginName` available on your system.

If the plugin exists in npm already, you can install it now via `$ hoodie install pluginName`.

Now go to `pocketBackend/node_modules` and do `$ npm link hoodie-plugin-pluginName`.

If the plugin is new and not installable through `$hoodie install`, you will have to add it to the package.json manually.
