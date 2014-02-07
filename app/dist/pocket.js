!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.app=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');

var BaseCollection = _dereq_('../../../helpers/mvc/collection');
var Model = _dereq_('../models/tile');

var Collection = BaseCollection.extend({
  url: app.request('config').api.url + '_plugins',
  model: Model
});

module.exports = Collection;


},{"../../../helpers/mvc/collection":9,"../../../helpers/namespace":11,"../models/tile":5}],2:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Tiles = _dereq_('./tiles');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  tiles: function (id, action) {
    new Tiles({
      id: id,
      action: action,
      ns: 'tiles'
    });
  }

});

module.exports = Controller;

},{"./tiles":3,"backbone.marionette":"Tt+p2S"}],3:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Collection = _dereq_('../collections/tiles');
var Model = _dereq_('../models/tile');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    //app.regions.meta.reset();
    //app.regions.viewer.reset();

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, 'reset', function () {

    });

  }

});

module.exports = controller;


},{"../collections/tiles":1,"../models/tile":5,"backbone.marionette":"Tt+p2S"}],4:[function(_dereq_,module,exports){
/*jshint -W079 */
var app = _dereq_('../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {
    this._controller = new Controller(options);

    app.regions = app.rm.addRegions({
      sidebar: 'aside',
      content: 'section'
    });

  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('tiles', function (filter, id) {
      self._controller.tiles(filter, id);
    });

  });

});

module.exports = app;

},{"../../helpers/namespace":11,"./controllers/index":2}],5:[function(_dereq_,module,exports){
'use strict';

var BaseModel = _dereq_('../../../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    description: '',
    title: '',
    pos: '',
    width: ''
  }

});

module.exports = Model;

},{"../../../helpers/mvc/model":10}],6:[function(_dereq_,module,exports){
var Marionette = _dereq_('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {

    'use strict';

    this.options = options || {};

    // create layout object passing in a template string
    var Layout = Marionette.Layout.extend({
      template:  function () {
        return options.template;
      }
    });

    // assign a region to the documents container
    this.container = new Backbone.Marionette.Region({
      el: '#content'
    });

    // bind layout to container element
    this.container.show(new Layout());

  }

});

module.exports = Controller;

},{"backbone.marionette":"Tt+p2S"}],7:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var fs = _dereq_('fs');

var app = _dereq_('../../../helpers/namespace');

app.module('layout', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components['vertebrae-layout'].template = "<aside> </aside>\n<section> </section>\n";

    this._controller = new Controller(
      options.app.components['vertebrae-layout']
    );

  });

});

module.exports = app;

},{"../../../helpers/namespace":11,"./controllers/index":6,"fs":23}],8:[function(_dereq_,module,exports){
/*global Handlebars:true */

var Handlebars = _dereq_('handlebars');


//
// place {{ debug }}
//
Handlebars.registerHelper('debug', function (optionalValue) {

  'use strict';

  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

module.exports = Handlebars;

},{"handlebars":"S8Vyg4"}],9:[function(_dereq_,module,exports){

'use strict';

var _ = _dereq_('underscore');
var Backbone = _dereq_('backbone');

var SuperCollection = Backbone.SuperCollection = Backbone.Collection.extend({

  next: function (model) {
    return this.at((this.indexOf(model) + 1) % _.size(this));
  },

  prev: function (model) {
    var index = this.indexOf(model) - 1;
    return this.at(index > -1 ? index : _.size(this) - 1);
  }

});

module.exports = SuperCollection;

},{"backbone":"m8WWUB","underscore":"EJRrov"}],10:[function(_dereq_,module,exports){
/*jshint -W079, -W098 */
var $ = _dereq_('jquery');
var Backbone = _dereq_('backbone');

var SuperModel = Backbone.Model.extend({
  idAttribute: 'id'
});

module.exports = SuperModel;

},{"backbone":"m8WWUB","jquery":"ZJsYNm"}],11:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/*jshint -W079 */
'use strict';
var Marionette = _dereq_('backbone.marionette');
var Backbone = _dereq_('backbone');

var Router = _dereq_('../router');

var Config = _dereq_('../models/config');

var app = new Marionette.Application();

//
// set global request handler exposing app config
//
app.reqres.setHandler('config', function () {
  return new Config().toJSON();
});


app.on('initialize:before', function (options) {

  // create router instance
  app.router = new Router();

  // create layout manager
  app.rm = new Marionette.RegionManager();

  //
  // log to console in debug mode
  if (options.debug) {
    global.app = app;

    app.vent.on('all', function (evt) {
      console.log(evt);
    });
  }

});

app.on('initialize:after', function () {

  // start router
  if (Backbone.history) {
    Backbone.history.start();
  }

});

module.exports = app;


},{"../models/config":16,"../router":17,"backbone":"m8WWUB","backbone.marionette":"Tt+p2S"}],12:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};var storeError = _dereq_('./storeError');
var storeSuccess = _dereq_('./storeSuccess');
var app = _dereq_('../namespace');
var $ = _dereq_('jquery');

app.addInitializer(function (config) {

  'use strict';

  $.ajaxSetup({
    cache : config.ajaxCache,
    timeout: config.ajaxTimeout
  });

  $(global).ajaxStart(function () {
    app.vent.trigger('ajax:start');
  });

  $(global).ajaxStop(function () {
    app.vent.trigger('ajax:stop');
  });

  $(global).ajaxError(storeError);
  $(global).ajaxSuccess(storeSuccess);

});

module.exports = app;

},{"../namespace":11,"./storeError":13,"./storeSuccess":14,"jquery":"ZJsYNm"}],13:[function(_dereq_,module,exports){
var $ = _dereq_('jquery');

var errors = function (e, jqXHR) {

  'use strict';

  var statusCode = jqXHR.status + '';
  var errorObj = null;

  try {
    errorObj = $.parseJSON(jqXHR.responseText);
  }
  catch (e) {}

  var errors = {
    'default' : function () { }
  };

  (errors[statusCode] ? errors[statusCode] : errors['default'])();
};

module.exports = errors;

},{"jquery":"ZJsYNm"}],14:[function(_dereq_,module,exports){
var success = function (e, jqXHR, opts, res) {

  'use strict';

  var statusCode = jqXHR.status + '';

  var success = {
    'default' : function () {
      console.log('SUCCESS', /* jqXHR ,*/ res);
    }
  };

  (success[statusCode] ? success[statusCode] : success['default'])();

};

module.exports = success;

},{}],15:[function(_dereq_,module,exports){
/*jshint -W079 */
var Config = _dereq_('./models/config');
var app = _dereq_('./helpers/namespace');

_dereq_('./helpers/storage/store');
_dereq_('./helpers/handlebars');

_dereq_('./components/structural/layout/index');
_dereq_('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;


},{"./components/pocket/index":4,"./components/structural/layout/index":7,"./helpers/handlebars":8,"./helpers/namespace":11,"./helpers/storage/store":12,"./models/config":16}],16:[function(_dereq_,module,exports){
var BaseModel = _dereq_('../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    app: {
      name: 'pocket',
      components: {
        'vertebrae-layout': {
          config: {
            template: null
          }
        },
        'vertebrae': {
          config: { }
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

},{"../helpers/mvc/model":10}],17:[function(_dereq_,module,exports){
'use strict';

var Router = Backbone.Router.extend({

  routes: {
    ''                      : 'tiles',
    'plugins/:id'           : 'tiles',
    '*defaults'             : 'tiles'
  },

  tiles: function (id, action) {
    app.vent.trigger('tiles', id, action);
  },

});

module.exports = Router;

},{}],"backbone.marionette":[function(_dereq_,module,exports){
module.exports=_dereq_('Tt+p2S');
},{}],"backbone":[function(_dereq_,module,exports){
module.exports=_dereq_('m8WWUB');
},{}],"handlebars":[function(_dereq_,module,exports){
module.exports=_dereq_('S8Vyg4');
},{}],"jquery":[function(_dereq_,module,exports){
module.exports=_dereq_('ZJsYNm');
},{}],"underscore":[function(_dereq_,module,exports){
module.exports=_dereq_('EJRrov');
},{}],23:[function(_dereq_,module,exports){

},{}]},{},[15])
(15)
});