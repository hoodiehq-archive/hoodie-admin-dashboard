# Pocket rebuild

Static HTML for now. Currently includes a fluid version of gridster.js (check out https://github.com/espy/gridster.js/blob/master/README.md to see how that works).

Remember to `$ npm install` :)

Start dev server with `$ grunt server` and open `http://localhost:4444`.
You need the livereload plugin for Chrome if you want livereload.

Build CSS with `$ grunt compass`
Build JS with `$ grunt browserify`
Build everything with `$ grunt build`

To test with a real app, run another Hoodie app somewhere else and note its `www` endpoint. Add this to Pocket's `app/js/models/config.js` under `api` like so:

````
api: {
  url: 'http://127.0.0.1:6055/_api/'
},
````

In addition, your Hoodie app needs a small mod to ``node_modules/hoodie_server/lib/server/index.js `:

````
var pack = new Hapi.Pack();

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
```

Enjoy!
