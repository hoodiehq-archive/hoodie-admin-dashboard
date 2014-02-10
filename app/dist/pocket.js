!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.app=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');

var BaseCollection = _dereq_('../../../helpers/mvc/collection');
var Model = _dereq_('../models/plugin');

var Collection = BaseCollection.extend({
  url: app.request('config').api.url + '_plugins',
  model: Model
});

module.exports = Collection;


},{"../../../helpers/mvc/collection":24,"../../../helpers/namespace":26,"../models/plugin":5}],2:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Plugins = _dereq_('./plugins');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  plugins: function (name, action) {
    new Plugins({
      name: name,
      action: action,
      ns: 'plugins'
    });
  }

});

module.exports = Controller;


},{"./plugins":3,"backbone.marionette":"Tt+p2S"}],3:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Collection = _dereq_('../collections/plugins');
var Model = _dereq_('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    // require ui dependencies
    _dereq_('../../ui/plugins/index');

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({
      reset: true
    });

    this.listenTo(this.collection, 'reset', function () {

      console.log(self.collection);

      switch (self.options.action) {
        case 'show':
          self.show(self.collection);
          break;
        case 'edit':
          self.edit(self.collection);
          break;
        default:
          self.list(self.collection);
      }

      app.vent.trigger('nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    });

  },

  show: function (model) {
    app.vent.trigger('plugins:show', {
      collection: model.collection,
      model: model,
      ns: this.options.ns
    });
  },

  edit: function (model) {
    app.vent.trigger('plugins:edit', {
      collection: model.collection,
      model: model,
      ns: this.options.ns
    });
  },


  list: function (collection) {
    app.vent.trigger('plugins:list', {
      collection: collection,
      ns: this.options.ns
    });
  }

});

module.exports = controller;


},{"../../ui/plugins/index":19,"../collections/plugins":1,"../models/plugin":5,"backbone.marionette":"Tt+p2S"}],4:[function(_dereq_,module,exports){
/*jshint -W079 */
var app = _dereq_('../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {

    // boot up default UI components
    _dereq_('../ui/logo/index');
    _dereq_('../ui/navigation/index');

    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins', function (name, action) {
      self._controller.plugins(name, action);
    });

  });

});

module.exports = app;

},{"../../helpers/namespace":26,"../ui/logo/index":13,"../ui/navigation/index":16,"./controllers/index":2}],5:[function(_dereq_,module,exports){
'use strict';

var BaseModel = _dereq_('../../../helpers/mvc/model');
var app = _dereq_('../../../helpers/namespace');

var config = app.request('config');

var Model = BaseModel.extend({

  initialize: function () {
    this.setIframeUrl();
  },

  setIframeUrl: function () {
    var url =  config.api.url + '_plugins/' + this.get('name') + '/pocket/index.html';
    this.set({
      'iframeUrl': url
    });
  },

  defaults: {
    name: '',
    description: '',
    title: '',
    version: '',
    pos: '',
    width: '',
    iframeUrl: ''
  }

});

module.exports = Model;

},{"../../../helpers/mvc/model":25,"../../../helpers/namespace":26}],6:[function(_dereq_,module,exports){
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
      el: 'section',
    });

    this.container.show(new Layout);
  }
});

module.exports = Controller;

},{"backbone.marionette":"Tt+p2S"}],7:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var fs = _dereq_('fs');
var app = _dereq_('../../../helpers/namespace');


app.module('pocket.content', function () {

  'use strict';

  this.addInitializer(function (options) {

    options.app.components.sidebar.template = "<section></section>\n<footer></footer>\n\n";

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {
    app.rm.addRegions({
      content: 'section',
      content_main: 'section iframe',
      content_footer: 'section footer'
    });
  });

});

module.exports = app;

},{"../../../helpers/namespace":26,"./controllers/index":6,"fs":38}],8:[function(_dereq_,module,exports){
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

},{"backbone.marionette":"Tt+p2S"}],9:[function(_dereq_,module,exports){
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

},{"../../../helpers/namespace":26,"./controllers/index":8,"fs":38}],10:[function(_dereq_,module,exports){
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

},{"backbone.marionette":"Tt+p2S"}],11:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var fs = _dereq_('fs');
var app = _dereq_('../../../helpers/namespace');


app.module('pocket.sidebar', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.sidebar.template = "<header></header>\n<nav></nav>\n<footer></footer>\n<!--<ul class=\"helpers\">-->\n  <!--<li>Pocket guides</li>-->\n  <!--<li>Hoodie</li>-->\n<!--</ul>-->\n";

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {

    app.rm.addRegions({
      sidebar: 'aside',
      sidebar_logo: 'aside header',
      sidebar_nav: 'aside nav',
      sidebar_footer: 'aside footer',
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":26,"./controllers/index":10,"fs":38}],12:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.options.model = new Backbone.Model({
      name: options.app.name
    });

    this.show(this.options);
  },

  show: function (opts) {
    var view = new View({
      model: opts.model
    });

    app.rm.get('sidebar_logo').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":26,"../views/index":14,"backbone.marionette":"Tt+p2S"}],13:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('logo', function () {

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

},{"../../../helpers/namespace":26,"./controllers/index":12}],14:[function(_dereq_,module,exports){
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

},{"../../../../helpers/handlebars":23,"backbone.marionette":"Tt+p2S","fs":38,"handlebars":"S8Vyg4"}],15:[function(_dereq_,module,exports){
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

    app.rm.get('sidebar_nav').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":26,"../views/index":17,"backbone.marionette":"Tt+p2S"}],16:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('navigation', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('nav:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":26,"./controllers/index":15}],17:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

var tmpl = "<a href=\"#plugins/{{name}}/show\">{{name}}</a>\n";

_dereq_('../../../../helpers/handlebars');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: Handlebars.compile(tmpl),

  events : {
    'click' : 'show'
  },

  show: function () {
    app.vent.trigger('plugins:show', {
      collection: this.model.collection,
      model: this.model,
      ns: 'plugins'
    });
  }

});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;


},{"../../../../helpers/handlebars":23,"backbone.marionette":"Tt+p2S","fs":38,"handlebars":"S8Vyg4"}],18:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');

var ListView = _dereq_('../views/list');
var ShowView = _dereq_('../views/show');
var EditView = _dereq_('../views/edit');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  list: function (opts) {
    var view = new ListView({
      collection: opts.collection,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  },

  show: function (opts) {
    var view = new ShowView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  },

  edit: function (opts) {
    var view = new EditView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":26,"../views/edit":20,"../views/list":21,"../views/show":22,"backbone.marionette":"Tt+p2S"}],19:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('plugins', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins:list', function (options) {
      self._controller.list(options);
    });

    app.vent.on('plugins:show', function (options) {
      self._controller.show(options);
    });

    app.vent.on('plugins:edit', function (options) {
      self._controller.edit(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":26,"./controllers/index":18}],20:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

_dereq_('../../../../helpers/handlebars');

var tmpl = "edit\n";

var View = Marionette.ItemView.extend({
  template: Handlebars.compile(tmpl),
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;

},{"../../../../helpers/handlebars":23,"backbone.marionette":"Tt+p2S","fs":38,"handlebars":"S8Vyg4"}],21:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

var tmpl = "<iframe src=\"{{iframeUrl}}\" frameborder=\"0\"></iframe>\n\n";

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


},{"../../../../helpers/handlebars":23,"backbone.marionette":"Tt+p2S","fs":38,"handlebars":"S8Vyg4"}],22:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Handlebars = _dereq_('handlebars');
var fs = _dereq_('fs');

_dereq_('../../../../helpers/handlebars');

var tmpl = "<iframe src=\"{{iframeUrl}}\" frameborder=\"0\"></iframe>\n";

var View = Marionette.ItemView.extend({
  template: Handlebars.compile(tmpl),
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;

},{"../../../../helpers/handlebars":23,"backbone.marionette":"Tt+p2S","fs":38,"handlebars":"S8Vyg4"}],23:[function(_dereq_,module,exports){
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

},{"handlebars":"S8Vyg4"}],24:[function(_dereq_,module,exports){

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

},{"backbone":"m8WWUB","underscore":"EJRrov"}],25:[function(_dereq_,module,exports){
/*jshint -W079, -W098 */
var $ = _dereq_('jquery');
var Backbone = _dereq_('backbone');

var SuperModel = Backbone.Model.extend({
  idAttribute: 'name'
});

module.exports = SuperModel;

},{"backbone":"m8WWUB","jquery":"ZJsYNm"}],26:[function(_dereq_,module,exports){
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


},{"../models/config":31,"../router":32,"backbone":"m8WWUB","backbone.marionette":"Tt+p2S"}],27:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};var storeError = _dereq_('./storeError');
var storeSuccess = _dereq_('./storeSuccess');
var app = _dereq_('../namespace');
var $ = _dereq_('jquery');

app.addInitializer(function (config) {

  'use strict';

  $.ajaxSetup({
    cache : config.ajax.cache,
    timeout: config.ajax.timeout,
    contentType: config.ajax.contentType,
    dataType: config.ajax.dataType,
    async: config.ajax.contentType
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

},{"../namespace":26,"./storeError":28,"./storeSuccess":29,"jquery":"ZJsYNm"}],28:[function(_dereq_,module,exports){
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

},{"jquery":"ZJsYNm"}],29:[function(_dereq_,module,exports){
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

},{}],30:[function(_dereq_,module,exports){
/*jshint -W079 */
var Config = _dereq_('./models/config');
var app = _dereq_('./helpers/namespace');

_dereq_('./helpers/storage/store');
_dereq_('./helpers/handlebars');

// boot up default structural components
_dereq_('./components/structural/layout/index');
_dereq_('./components/structural/sidebar/index');
_dereq_('./components/structural/content/index');

// start the pocket component
_dereq_('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;


},{"./components/pocket/index":4,"./components/structural/content/index":7,"./components/structural/layout/index":9,"./components/structural/sidebar/index":11,"./helpers/handlebars":23,"./helpers/namespace":26,"./helpers/storage/store":27,"./models/config":31}],31:[function(_dereq_,module,exports){
var BaseModel = _dereq_('../helpers/mvc/model');

var Model = BaseModel.extend({

  // TODO: the below should be extended by appconfig
  defaults: {
    app: {
      name: 'appname',
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
        'content': {
          config: { }
        }
      }
    },

    api: {
      url: 'http://localhost:6013/_api/'
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

},{"../helpers/mvc/model":25}],32:[function(_dereq_,module,exports){
'use strict';

var Router = Backbone.Router.extend({

  routes: {
    ''                      : 'plugins',
    'plugins/:name'         : 'plugins',
    '*defaults'             : 'plugins'
  },

  plugins: function (filter) {
    if (filter) {
      var action = filter.split('/')[2] || '';
      var name = filter.split('/')[1] || filter;

      app.vent.trigger('plugins', name, action);
    } else {
      app.vent.trigger('plugins');
    }

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
},{}],38:[function(_dereq_,module,exports){

},{}]},{},[30])
(30)
});