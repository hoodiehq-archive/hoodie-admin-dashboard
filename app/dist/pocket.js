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


},{"../../../helpers/mvc/collection":17,"../../../helpers/namespace":19,"../models/tile":5}],2:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Tiles = _dereq_('./tiles');

_dereq_('../../ui/logo/index');
_dereq_('../../ui/plugin_list/index');

var Controller = Marionette.Controller.extend({


  initialize: function (options) {
    this.options = options || {};
    app.vent.trigger('logo:show', options);
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

},{"../../ui/logo/index":11,"../../ui/plugin_list/index":14,"./tiles":3,"backbone.marionette":"Tt+p2S"}],3:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Collection = _dereq_('../collections/tiles');
var Model = _dereq_('../models/tile');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, 'reset', function () {

      app.vent.trigger('plugin_list:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

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
      sidebar_logo: 'aside header',
      sidebar_plugin_list: 'aside #plugin-list',
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

},{"../../helpers/namespace":19,"./controllers/index":2}],5:[function(_dereq_,module,exports){
'use strict';

var BaseModel = _dereq_('../../../helpers/mvc/model');

var Model = BaseModel.extend({

  defaults: {
    name: '',
    description: '',
    title: '',
    version: '',
    pos: '',
    width: ''
  }

});

module.exports = Model;

},{"../../../helpers/mvc/model":18}],6:[function(_dereq_,module,exports){
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
    options.app.components.layout.template = "<aside class=\"sidebar\"> </aside>\n<section class=\"content\"> </section>\n";

    this._controller = new Controller(
      options.app.components.layout
    );

  });

});

module.exports = app;

},{"../../../helpers/namespace":19,"./controllers/index":6,"fs":31}],8:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    // create layout object passing in a template string
    var Layout = Marionette.Layout.extend({
      template:  function () {
        return options.template;
      }
    });

    this.container = new Marionette.Region({
      el: 'aside',
    });

    this.container.show(new Layout);
  }
});

module.exports = Controller;

},{"backbone.marionette":"Tt+p2S"}],9:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var fs = _dereq_('fs');
var app = _dereq_('../../../helpers/namespace');


app.module('pocket.sidebar', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.sidebar.template = "<header></header>\n<section id=\"plugin-list\"></div>\n<!--<ul class=\"helpers\">-->\n  <!--<li>Pocket guides</li>-->\n  <!--<li>Hoodie</li>-->\n<!--</ul>-->\n";

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

});

module.exports = app;

},{"../../../helpers/namespace":19,"./controllers/index":8,"fs":31}],10:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    // TODO: needs to come from the pocket components model
    //
    this.options.model = new Backbone.Model({
      name: 'minutes.io'
    });

    this.show(this.options);
  },

  show: function (opts) {
    var view = new View({
      model: opts.model
    });

    app.regions.sidebar_logo.show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":19,"../views/index":12,"backbone.marionette":"Tt+p2S"}],11:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('snug.logo', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('logo:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":19,"./controllers/index":10}],12:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

_dereq_('../../../../helpers/handlebars');

var tmpl = "<h1>\n  <a href=\"#\"> {{name}} </a>\n</h1>\n\n";

var View = Marionette.ItemView.extend({
  template: Handlebars.compile(tmpl),
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;

},{"../../../../helpers/handlebars":16,"backbone.marionette":"Tt+p2S","fs":31,"handlebars":"S8Vyg4"}],13:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  show: function (opts) {
    var view = new View({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.regions.sidebar_plugin_list.show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":19,"../views/index":15,"backbone.marionette":"Tt+p2S"}],14:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('snug.plugin_list', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugin_list:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":19,"./controllers/index":13}],15:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

var tmpl = "<a href=\"#plugins/show/{{name}}\">{{name}}</a>\n";

_dereq_('../../../../helpers/handlebars');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: Handlebars.compile(tmpl),

  events : {
    'click' : 'show'
  },

  show: function () {
    console.info('show plugin');
  }

});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;


},{"../../../../helpers/handlebars":16,"backbone.marionette":"Tt+p2S","fs":31,"handlebars":"S8Vyg4"}],16:[function(_dereq_,module,exports){
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

},{"handlebars":"S8Vyg4"}],17:[function(_dereq_,module,exports){

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

},{"backbone":"m8WWUB","underscore":"EJRrov"}],18:[function(_dereq_,module,exports){
/*jshint -W079, -W098 */
var $ = _dereq_('jquery');
var Backbone = _dereq_('backbone');

var SuperModel = Backbone.Model.extend({
  idAttribute: 'id'
});

module.exports = SuperModel;

},{"backbone":"m8WWUB","jquery":"ZJsYNm"}],19:[function(_dereq_,module,exports){
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


},{"../models/config":24,"../router":25,"backbone":"m8WWUB","backbone.marionette":"Tt+p2S"}],20:[function(_dereq_,module,exports){
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

},{"../namespace":19,"./storeError":21,"./storeSuccess":22,"jquery":"ZJsYNm"}],21:[function(_dereq_,module,exports){
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

},{"jquery":"ZJsYNm"}],22:[function(_dereq_,module,exports){
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

},{}],23:[function(_dereq_,module,exports){
/*jshint -W079 */
var Config = _dereq_('./models/config');
var app = _dereq_('./helpers/namespace');

_dereq_('./helpers/storage/store');
_dereq_('./helpers/handlebars');

_dereq_('./components/structural/layout/index');
_dereq_('./components/structural/sidebar/index');
_dereq_('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;


},{"./components/pocket/index":4,"./components/structural/layout/index":7,"./components/structural/sidebar/index":9,"./helpers/handlebars":16,"./helpers/namespace":19,"./helpers/storage/store":20,"./models/config":24}],24:[function(_dereq_,module,exports){
var BaseModel = _dereq_('../helpers/mvc/model');

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

},{"../helpers/mvc/model":18}],25:[function(_dereq_,module,exports){
'use strict';

var Router = Backbone.Router.extend({

  routes: {
    ''                      : 'tiles',
    'plugins/:id'           : 'tiles',
    '*defaults'             : 'tiles'
  },

  tiles: function (id, action) {
    app.vent.trigger('tiles', id, action);
  }

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
},{}],31:[function(_dereq_,module,exports){

},{}]},{},[23])
(23)
});