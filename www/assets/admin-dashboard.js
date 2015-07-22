/* jshint ignore:start */

/* jshint ignore:end */

define('admin-dashboard/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'admin-dashboard/config/environment', 'npm:hoodie.admin'], function (exports, Ember, Resolver, loadInitializers, config, HoodieAdmin) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  window.hoodieAdmin = new HoodieAdmin['default']();

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('admin-dashboard/components/add-user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    init: function init() {
      this.setProperties({
        'newUserName': '',
        'newUserPassword': '',
        disableAdd: false
      });
      this._super.apply(this, arguments);
    },
    actions: {
      addUser: function addUser() {
        var route = this;
        this.set('disableAdd', true);

        var hoodieId = Math.random().toString().substr(2);
        var newUser = {
          id: this.get('newUserName'),
          name: 'user/' + this.get('newUserName'),
          hoodieId: hoodieId,
          database: 'user/' + hoodieId,
          signedUpAt: new Date(),
          roles: [],
          password: this.get('newUserPassword')
        };

        window.hoodieAdmin.user.add('user', newUser).done(function (response) {
          route.$('.submitMessage').text('Success: added "' + response.id + '" as a new user.');
          route.set('disableAdd', false);
          route.sendAction();
        }).fail(function (error) {
          console.log('error: ', error);
          route.set('disableAdd', false);
          if (error.name === 'HoodieConflictError') {
            route.$('.submitMessage').text('Sorry, the user "' + username + '" already exists.');
          } else {
            route.$('.submitMessage').text('Error: ' + error.status + ' - ' + error.responseText);
          }
        });
      }
    }
  });

});
define('admin-dashboard/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('admin-dashboard/controllers/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('admin-dashboard/controllers/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    reset: function reset() {
      this.setProperties({
        // Username is always 'admin'
        username: 'admin',
        password: 'admin',
        errorMessage: ''
      });
    },

    // Adds the bearer token to all ajax requests, if it's present, otherwise redirect to login
    setBearerToken: function setBearerToken() {
      if (window.hoodieAdmin.account.bearerToken) {
        Ember['default'].$.ajaxSetup({
          headers: {
            'Authorization': 'Bearer ' + window.hoodieAdmin.account.bearerToken
          }
        });
      } else {
        this.transitionToRoute('login');
      }
    },

    // Either continue with the route set before the user had to auth,
    // or go to a default route.
    gotoRoute: function gotoRoute(self) {
      self.setBearerToken();
      var attemptedTransition = self.get('attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        self.set('attemptedTransition', null);
      } else {
        // Redirect to 'plugins' by default.
        self.transitionToRoute('plugins');
      }
    },

    login: function login() {
      var self = this;
      var data = this.getProperties('username', 'password');

      // Clear out any error messages.
      this.set('errorMessage', null);

      // If signed in, go somewhere else
      if (window.hoodieAdmin.account.isSignedIn) {
        self.gotoRoute(self);
      }

      window.hoodieAdmin.account.signIn(data.password).done(function (res) {
        self.gotoRoute(self);
      }).fail(function (err) {
        self.set('errorMessage', 'Error: ' + err.message);
      });
    }
  });

});
define('admin-dashboard/controllers/logout', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    logout: function logout() {
      window.hoodieAdmin.account.signOut();
      this.transitionToRoute('login');
    }
  });

});
define('admin-dashboard/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('admin-dashboard/helpers/convert-iso-to-timestamp', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.convertISOToTimestamp = convertISOToTimestamp;

  function convertISOToTimestamp(ISODate) {
    if (ISODate) {
      return new Date(ISODate).getTime();
    } else {
      return '';
    }
  }

  exports['default'] = Ember['default'].Helper.helper(convertISOToTimestamp);

});
define('admin-dashboard/helpers/is-active-table-header', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.isActiveTableHeader = isActiveTableHeader;

  function isActiveTableHeader(params) {
    console.log('params: ', params);
    if (params[0] === params[1]) {
      return 'active';
    } else {
      return null;
    }
  }

  exports['default'] = Ember['default'].Helper.helper(isActiveTableHeader);

});
define('admin-dashboard/helpers/link-to-futon-user', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.linkToFutonUser = linkToFutonUser;

  function linkToFutonUser(userName) {
    return window.location.origin + '/_api/_utils/document.html?_users/org.couchdb.user:' + userName;
  }

  exports['default'] = Ember['default'].Helper.helper(linkToFutonUser);

});
define('admin-dashboard/initializers/ember-cli-dates', ['exports', 'ember', 'ember-cli-dates/helpers/time-format', 'ember-cli-dates/helpers/time-ago-in-words', 'ember-cli-dates/helpers/day-of-the-week', 'ember-cli-dates/helpers/time-ahead-in-words', 'ember-cli-dates/helpers/time-delta-in-words', 'ember-cli-dates/helpers/month-and-year', 'ember-cli-dates/helpers/month-and-day', 'ember-cli-dates/helpers/date-and-time'], function (exports, Ember, time_format, time_ago_in_words, day_of_the_week, time_ahead_in_words, time_delta_in_words, month_and_year, month_and_day, date_and_time) {

  'use strict';

  var initialize = function initialize() {
    Ember['default'].Handlebars.helper('time-format', time_format.timeFormat);
    Ember['default'].Handlebars.helper('time-ago-in-words', time_ago_in_words.timeAgoInWords);
    Ember['default'].Handlebars.helper('day-of-the-week', day_of_the_week.dayOfTheWeek);
    Ember['default'].Handlebars.helper('time-ahead-in-words', time_ahead_in_words.timeAheadInWords);
    Ember['default'].Handlebars.helper('time-delta-in-words', time_delta_in_words.timeDeltaInWords);
    Ember['default'].Handlebars.helper('month-and-year', month_and_year.monthAndYear);
    Ember['default'].Handlebars.helper('month-and-day', month_and_day.monthAndDay);
    Ember['default'].Handlebars.helper('date-and-time', date_and_time.dateAndTime);
  };

  exports['default'] = {
    name: 'ember-cli-dates',
    initialize: initialize
  };
  /* container, app */

  exports.initialize = initialize;

});
define('admin-dashboard/initializers/export-application-global', ['exports', 'ember', 'admin-dashboard/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('admin-dashboard/instance-initializers/app-version', ['exports', 'admin-dashboard/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('admin-dashboard/router', ['exports', 'ember', 'admin-dashboard/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('logout');
    this.route('plugins', { path: '/plugins' }, function () {
      this.route('plugin', { path: ':plugin_id' });
      this.route('usersnew', { path: 'usersnew' }, function () {
        this.route('user', { path: ':user_id' });
      });
    });
  });

  exports['default'] = Router;

});
define('admin-dashboard/routes/authenticated', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    // Before the model is loaded, check if the admin is signed in, and redirect to login if not
    beforeModel: function beforeModel(transition) {
      if (!window.hoodieAdmin.account.isSignedIn()) {
        this.redirectToLogin(transition);
      }
    },

    redirectToLogin: function redirectToLogin(transition) {
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
    },

    actions: {
      error: function error(reason, transition) {
        if (reason.status === 401) {
          this.redirectToLogin(transition);
        } else {
          console.log('Something went wrong: ', reason);
        }
      }
    }
  });

});
define('admin-dashboard/routes/index', ['exports', 'ember', 'admin-dashboard/routes/authenticated'], function (exports, Ember, AuthenticatedRoute) {

  'use strict';

  exports['default'] = AuthenticatedRoute['default'].extend({
    afterModel: function afterModel() {
      this.transitionTo('plugins');
    }
  });

});
define('admin-dashboard/routes/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    setupController: function setupController(controller) {
      controller.reset();
    }
  });

});
define('admin-dashboard/routes/logout', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    setupController: function setupController(controller) {
      controller.logout();
    }
  });

});
define('admin-dashboard/routes/plugins', ['exports', 'ember', 'admin-dashboard/routes/authenticated'], function (exports, Ember, AuthenticatedRoute) {

  'use strict';

  exports['default'] = AuthenticatedRoute['default'].extend({

    model: function model() {

      var config = Ember['default'].$.getJSON('/_api/app/config').then(function (data) {
        data.id = data._id;
        return data;
      });

      var plugins = Ember['default'].$.getJSON('/_api/_plugins').then(function (data) {
        Ember['default'].$.each(data, function (index, plugin) {
          plugin.id = plugin.name;
        });
        var plugins = {
          plugins: data
        };
        return plugins;
      });

      var promises = {
        config: config,
        plugins: plugins
      };

      return Ember['default'].RSVP.hash(promises).then(function (data) {
        return data;
      });
    }
  });

});
define('admin-dashboard/routes/plugins/plugin', ['exports', 'ember', 'admin-dashboard/routes/authenticated'], function (exports, Ember, AuthenticatedRoute) {

  'use strict';

  exports['default'] = AuthenticatedRoute['default'].extend({
    model: function model(params) {
      return Ember['default'].$.getJSON('/_api/_plugins').then(function (plugins) {
        Ember['default'].$.each(plugins, function (index, plugin) {
          plugin.id = plugin.name;
        });
        var matchingPlugins = Ember['default'].$.grep(plugins, function (plugin) {
          return plugin.name === params.plugin_id;
        });
        return matchingPlugins[0];
      });
    }
  });

});
define('admin-dashboard/routes/plugins/usersnew', ['exports', 'ember', 'admin-dashboard/routes/authenticated'], function (exports, Ember, AuthenticatedRoute) {

  'use strict';

  exports['default'] = AuthenticatedRoute['default'].extend({
    init: function init() {
      this.setProperties({
        pageLength: 5,
        sortBy: 'created-at',
        sortDesc: true,
        searchTerm: ''
      });
      this._super.apply(this, arguments);
    },
    model: function model() {
      var route = this;
      var url = '/_api/_users/_design/hoodie-plugin-users/_view/by-' + this.get('sortBy') + '?descending=' + this.get('sortDesc') + '&limit=' + this.get('pageLength');
      if (this.get('searchTerm')) {
        url = '/_api/_users/_design/hoodie-plugin-users/_view/by-name?descending=false&limit=' + this.get('pageLength') + '&startkey="' + this.get('searchTerm') + '"' + '&endkey="' + this.get('searchTerm') + '￰"';
      }
      return Ember['default'].$.getJSON(url).then(function (users) {
        var resultsDesc = 'Currently displaying all ' + users.total_rows + ' users';
        switch (users.length) {
          case 1:
            resultsDesc = 'You have a single user';
            break;
          case 0:
            resultsDesc = 'You have no users yet';
            break;
        }

        var result = {
          'users': users.rows,
          'totalUsers': users.total_rows,
          'resultsDesc': resultsDesc,
          'pageLength': route.get('pageLength'),
          'sortBy': route.get('sortBy'),
          'sortDesc': route.get('sortDesc'),
          'searchTerm': route.get('searchTerm')
        };

        return result;
      });
    },

    computed: (function () {}).property('sortBy', 'sortDesc', 'searchTerm'),

    actions: {
      updateUserList: function updateUserList() {
        this.refresh();
      },
      search: function search() {
        this.set('searchTerm', this.currentModel.searchTerm);
        this.refresh();
        return false;
      },
      clearSearch: function clearSearch() {
        this.set('searchTerm', '');
        this.refresh();
        return false;
      },
      sortBy: function sortBy(_sortBy) {
        // If it's a double click we're probably flipping the sort order
        if (_sortBy === this.get('sortBy')) {
          this.toggleProperty('sortDesc');
        } else {
          this.set('sortBy', _sortBy);
        }
        this.refresh();
        return false;
      }
    }
  });

});
define('admin-dashboard/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "admin-dashboard/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('admin-dashboard/templates/components/add-user', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 7
          }
        },
        "moduleName": "admin-dashboard/templates/components/add-user.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Add new user");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"class","addUser");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","group");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","");
        var el5 = dom.createTextNode("New user's name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","");
        var el5 = dom.createTextNode("New user's password");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","submit btn ok");
        dom.setAttribute(el4,"type","submit");
        var el5 = dom.createTextNode("Add user");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","submitMessage");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1, 1]);
        var element2 = dom.childAt(element1, [9]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(element1,7,7);
        morphs[3] = dom.createAttrMorph(element2, 'disabled');
        return morphs;
      },
      statements: [
        ["element","action",["addUser"],["on","submit"],["loc",[null,[2,22],[2,54]]]],
        ["inline","input",[],["type","text","class","form-control username","placeholder","User name","required","","value",["subexpr","@mut",[["get","newUserName",["loc",[null,[6,98],[6,109]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disableAdd",["loc",[null,[6,119],[6,129]]]]],[],[]]],["loc",[null,[6,6],[6,131]]]],
        ["inline","input",[],["type","text","class","form-control password","placeholder","Password","required","","value",["subexpr","@mut",[["get","newUserPassword",["loc",[null,[8,97],[8,112]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disableAdd",["loc",[null,[8,122],[8,132]]]]],[],[]]],["loc",[null,[8,6],[8,134]]]],
        ["attribute","disabled",["get","disableAdd",["loc",[null,[9,61],[9,71]]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('admin-dashboard/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "admin-dashboard/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('admin-dashboard/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "admin-dashboard/templates/login.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("You are already logged in!");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 4
              },
              "end": {
                "line": 11,
                "column": 4
              }
            },
            "moduleName": "admin-dashboard/templates/login.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            dom.setAttribute(el1,"class","warning");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","errorMessage",["loc",[null,[10,25],[10,41]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "admin-dashboard/templates/login.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          dom.setAttribute(el1,"class","form-inline login");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"src","assets/images/hoodie_logo.svg");
          dom.setAttribute(el2,"alt","");
          dom.setAttribute(el2,"class","fitWidth");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          dom.setAttribute(el2,"for","password");
          var el3 = dom.createTextNode("Please enter your admin password:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,5,5);
          morphs[2] = dom.createMorphAt(element0,7,7);
          morphs[3] = dom.createMorphAt(element0,9,9);
          return morphs;
        },
        statements: [
          ["element","action",[["get","login",["loc",[null,[4,43],[4,48]]]]],["on","submit"],["loc",[null,[4,34],[4,62]]]],
          ["inline","input",[],["id","password","value",["subexpr","@mut",[["get","password",["loc",[null,[7,32],[7,40]]]]],[],[]],"type","password","placeholder","Admin password","autofocus","autofocus"],["loc",[null,[7,4],[7,109]]]],
          ["inline","input",[],["class","btn","type","submit","value","Log In"],["loc",[null,[8,4],[8,54]]]],
          ["block","if",[["get","errorMessage",["loc",[null,[9,10],[9,22]]]]],[],0,null,["loc",[null,[9,4],[11,11]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 7
          }
        },
        "moduleName": "admin-dashboard/templates/login.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","loggedIn",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[13,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('admin-dashboard/templates/logout', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "admin-dashboard/templates/logout.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('admin-dashboard/templates/plugins', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 8
            },
            "end": {
              "line": 3,
              "column": 37
            }
          },
          "moduleName": "admin-dashboard/templates/plugins.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Dashboard");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 58
              }
            },
            "moduleName": "admin-dashboard/templates/plugins.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","plugin.title",["loc",[null,[9,42],[9,58]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 4
            }
          },
          "moduleName": "admin-dashboard/templates/plugins.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["block","link-to",["plugins.plugin",["get","plugin",["loc",[null,[9,34],[9,40]]]]],[],0,null,["loc",[null,[9,6],[9,70]]]]
        ],
        locals: ["plugin"],
        templates: [child0]
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 8
            },
            "end": {
              "line": 12,
              "column": 48
            }
          },
          "moduleName": "admin-dashboard/templates/plugins.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Users New");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 8
            },
            "end": {
              "line": 15,
              "column": 35
            }
          },
          "moduleName": "admin-dashboard/templates/plugins.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("logout");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "admin-dashboard/templates/plugins.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","sidebar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3,"class","subline");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","plugin-list");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","helpers");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","main-content");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pluginView");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[2] = dom.createMorphAt(element2,1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [5, 1]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[3,8],[3,49]]]],
        ["content","model.config.config.app_name",["loc",[null,[4,26],[4,58]]]],
        ["block","each",[["get","model.plugins.plugins",["loc",[null,[7,12],[7,33]]]]],[],1,null,["loc",[null,[7,4],[11,13]]]],
        ["block","link-to",["plugins.usersnew"],[],2,null,["loc",[null,[12,8],[12,60]]]],
        ["block","link-to",["logout"],[],3,null,["loc",[null,[15,8],[15,47]]]],
        ["content","outlet",["loc",[null,[20,4],[20,14]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('admin-dashboard/templates/plugins/plugin', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 108
          }
        },
        "moduleName": "admin-dashboard/templates/plugins/plugin.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("iframe");
        dom.setAttribute(el1,"name","plugin");
        dom.setAttribute(el1,"frameborder","0");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(1);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        return morphs;
      },
      statements: [
        ["attribute","src",["concat",["/_api/_plugins/",["get","model.id",["loc",[null,[1,44],[1,52]]]],"/admin-dashboard/index.html"]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('admin-dashboard/templates/plugins/usersnew', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 10
            },
            "end": {
              "line": 17,
              "column": 10
            }
          },
          "moduleName": "admin-dashboard/templates/plugins/usersnew.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn clearSearch");
          var el2 = dom.createTextNode("Clear search");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element11 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element11);
          return morphs;
        },
        statements: [
          ["element","action",["clearSearch"],[],["loc",[null,[16,42],[16,66]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 39,
                "column": 10
              },
              "end": {
                "line": 50,
                "column": 10
              }
            },
            "moduleName": "admin-dashboard/templates/plugins/usersnew.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("tr");
            dom.setAttribute(el1,"class","user");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2,"class","timeago");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            var el3 = dom.createElement("span");
            dom.setAttribute(el3,"class","pill");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2,"class","no-sort");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("a");
            dom.setAttribute(el3,"class","edit");
            var el4 = dom.createTextNode("edit");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" /\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("a");
            dom.setAttribute(el3,"href","#");
            dom.setAttribute(el3,"class","removeUserPrompt");
            var el4 = dom.createTextNode("delete");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" /\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("a");
            var el4 = dom.createTextNode("futon");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n            ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [3]);
            var element2 = dom.childAt(element0, [7]);
            var element3 = dom.childAt(element2, [1]);
            var element4 = dom.childAt(element2, [5]);
            var morphs = new Array(8);
            morphs[0] = dom.createAttrMorph(element0, 'data-id');
            morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
            morphs[2] = dom.createAttrMorph(element1, 'data-sort');
            morphs[3] = dom.createAttrMorph(element1, 'title');
            morphs[4] = dom.createMorphAt(element1,0,0);
            morphs[5] = dom.createMorphAt(dom.childAt(element0, [5, 0]),0,0);
            morphs[6] = dom.createAttrMorph(element3, 'href');
            morphs[7] = dom.createAttrMorph(element4, 'href');
            return morphs;
          },
          statements: [
            ["attribute","data-id",["concat",[["get","user.value.id",["loc",[null,[40,25],[40,38]]]]]]],
            ["content","user.value.name",["loc",[null,[41,16],[41,35]]]],
            ["attribute","data-sort",["concat",[["subexpr","convert-ISO-to-timestamp",[["get","user.value.createdAt",["loc",[null,[42,54],[42,74]]]]],[],["loc",[null,[42,27],[42,76]]]]]]],
            ["attribute","title",["concat",[["get","user.value.createdAt",["loc",[null,[42,103],[42,123]]]]]]],
            ["inline","time-ago-in-words",[["get","user.value.createdAt",["loc",[null,[42,147],[42,167]]]]],[],["loc",[null,[42,127],[42,169]]]],
            ["content","user.value.state",["loc",[null,[43,35],[43,55]]]],
            ["attribute","href",["concat",["#user/",["get","user.id",["loc",[null,[45,31],[45,38]]]]]]],
            ["attribute","href",["concat",[["subexpr","link-to-futon-user",[["get","user.name",["loc",[null,[47,44],[47,53]]]]],[],["loc",[null,[47,23],[47,55]]]]]]]
          ],
          locals: ["user"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 6
            },
            "end": {
              "line": 53,
              "column": 6
            }
          },
          "moduleName": "admin-dashboard/templates/plugins/usersnew.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1,"id","userList");
          dom.setAttribute(el1,"class","table users table-striped");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          var el5 = dom.createTextNode("Username");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          var el5 = dom.createTextNode("Signup date");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4,"data-sort-by","state");
          var el5 = dom.createTextNode("State");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n            ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4,"class","no-sort");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1]);
          var element6 = dom.childAt(element5, [1]);
          var element7 = dom.childAt(element6, [1]);
          var element8 = dom.childAt(element7, [1]);
          var element9 = dom.childAt(element7, [3]);
          var element10 = dom.childAt(element7, [5]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element6, 'class');
          morphs[1] = dom.createAttrMorph(element8, 'class');
          morphs[2] = dom.createElementMorph(element8);
          morphs[3] = dom.createAttrMorph(element9, 'class');
          morphs[4] = dom.createElementMorph(element9);
          morphs[5] = dom.createElementMorph(element10);
          morphs[6] = dom.createMorphAt(dom.childAt(element5, [3]),1,1);
          return morphs;
        },
        statements: [
          ["attribute","class",["concat",[["subexpr","if",[["get","model.sortDesc",["loc",[null,[30,27],[30,41]]]],"desc","asc"],[],["loc",[null,[30,22],[30,56]]]]]]],
          ["attribute","class",["concat",[["subexpr","is-active-table-header",["name",["get","model.sortBy",["loc",[null,[32,82],[32,94]]]]],[],["loc",[null,[32,50],[32,96]]]]]]],
          ["element","action",["sortBy","name"],[],["loc",[null,[32,16],[32,42]]]],
          ["attribute","class",["concat",[["subexpr","is-active-table-header",["created-at",["get","model.sortBy",["loc",[null,[33,94],[33,106]]]]],[],["loc",[null,[33,56],[33,108]]]]]]],
          ["element","action",["sortBy","created-at"],[],["loc",[null,[33,16],[33,48]]]],
          ["element","action",["sortBy","state"],[],["loc",[null,[34,37],[34,64]]]],
          ["block","each",[["get","model.users",["loc",[null,[39,18],[39,29]]]]],[],0,null,["loc",[null,[39,10],[50,19]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 6
          }
        },
        "moduleName": "admin-dashboard/templates/plugins/usersnew.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","internalPlugin");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("New Ember Users Plugin");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Search for users");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3,"class","userSearch");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("fieldset");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","group");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6,"for","");
        var el7 = dom.createTextNode("Search term");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","help-block");
        var el7 = dom.createTextNode("Search only applies to usernames.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6,"class","submit btn ok");
        dom.setAttribute(el6,"type","submit");
        var el7 = dom.createTextNode("Search");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Your users");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","content centered");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","tableStatus");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","currentSearchTerm muted");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5,"class","currentSearchMetrics muted");
        var el6 = dom.createTextNode("Showing ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("strong");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" out of a total of ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("strong");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" users.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element12 = dom.childAt(fragment, [0, 1]);
        var element13 = dom.childAt(element12, [7]);
        var element14 = dom.childAt(element13, [1, 1]);
        var element15 = dom.childAt(element12, [11]);
        var element16 = dom.childAt(element15, [1]);
        var element17 = dom.childAt(element16, [3]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(element12,3,3);
        morphs[1] = dom.createElementMorph(element13);
        morphs[2] = dom.createMorphAt(element14,3,3);
        morphs[3] = dom.createMorphAt(element14,9,9);
        morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element16, [1]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(element17, [1]),0,0);
        morphs[6] = dom.createMorphAt(dom.childAt(element17, [3]),0,0);
        morphs[7] = dom.createMorphAt(element15,3,3);
        return morphs;
      },
      statements: [
        ["inline","add-user",[],["action","updateUserList"],["loc",[null,[5,4],[5,40]]]],
        ["element","action",["search"],["on","submit"],["loc",[null,[8,29],[8,60]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.searchTerm",["loc",[null,[12,24],[12,40]]]]],[],[]],"type","text","class","form-control search-query","placeholder","Username"],["loc",[null,[12,10],[12,111]]]],
        ["block","if",[["get","model.searchTerm",["loc",[null,[15,16],[15,32]]]]],[],0,null,["loc",[null,[15,10],[17,17]]]],
        ["content","model.resultsDesc",["loc",[null,[25,43],[25,66]]]],
        ["content","model.users.length",["loc",[null,[26,62],[26,84]]]],
        ["content","model.totalUsers",["loc",[null,[26,120],[26,140]]]],
        ["block","if",[["get","model.users",["loc",[null,[28,12],[28,23]]]]],[],1,null,["loc",[null,[28,6],[53,13]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('admin-dashboard/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/components/add-user.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/add-user.js should pass jshint', function() { 
    ok(false, 'components/add-user.js should pass jshint.\ncomponents/add-user.js: line 37, col 62, \'username\' is not defined.\n\n1 error'); 
  });

});
define('admin-dashboard/tests/controllers/index.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/index.js should pass jshint', function() { 
    ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/controllers/login.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/login.js should pass jshint', function() { 
    ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 53, col 22, \'res\' is defined but never used.\n\n1 error'); 
  });

});
define('admin-dashboard/tests/controllers/logout.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/logout.js should pass jshint', function() { 
    ok(true, 'controllers/logout.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/helpers/convert-iso-to-timestamp.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/convert-iso-to-timestamp.js should pass jshint', function() { 
    ok(true, 'helpers/convert-iso-to-timestamp.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/helpers/is-active-table-header.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/is-active-table-header.js should pass jshint', function() { 
    ok(true, 'helpers/is-active-table-header.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/helpers/link-to-futon-user.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/link-to-futon-user.js should pass jshint', function() { 
    ok(true, 'helpers/link-to-futon-user.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/helpers/resolver', ['exports', 'ember/resolver', 'admin-dashboard/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('admin-dashboard/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/helpers/start-app', ['exports', 'ember', 'admin-dashboard/app', 'admin-dashboard/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('admin-dashboard/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/integration/components/add-user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('add-user', 'Integration | Component | add user', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.3',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'add-user', ['loc', [null, [1, 0], [1, 12]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.3',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.3',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'add-user', [], [], 0, null, ['loc', [null, [2, 4], [4, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('admin-dashboard/tests/integration/components/add-user-test.jshint', function () {

  'use strict';

  module('JSHint - integration/components');
  test('integration/components/add-user-test.js should pass jshint', function() { 
    ok(true, 'integration/components/add-user-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/authenticated.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/authenticated.js should pass jshint', function() { 
    ok(true, 'routes/authenticated.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 8, \'Ember\' is defined but never used.\n\n1 error'); 
  });

});
define('admin-dashboard/tests/routes/login.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/login.js should pass jshint', function() { 
    ok(true, 'routes/login.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/logout.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/logout.js should pass jshint', function() { 
    ok(true, 'routes/logout.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/plugins.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/plugins.js should pass jshint', function() { 
    ok(true, 'routes/plugins.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/plugins/plugin.jshint', function () {

  'use strict';

  module('JSHint - routes/plugins');
  test('routes/plugins/plugin.js should pass jshint', function() { 
    ok(true, 'routes/plugins/plugin.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/routes/plugins/usersnew.jshint', function () {

  'use strict';

  module('JSHint - routes/plugins');
  test('routes/plugins/usersnew.js should pass jshint', function() { 
    ok(true, 'routes/plugins/usersnew.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/test-helper', ['admin-dashboard/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('admin-dashboard/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/controllers/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:login', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('admin-dashboard/tests/unit/controllers/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/login-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/login-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/controllers/logout-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:logout', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('admin-dashboard/tests/unit/controllers/logout-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/logout-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/logout-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/helpers/convert-iso-to-timestamp-test', ['admin-dashboard/helpers/convert-iso-to-timestamp', 'qunit'], function (convert_iso_to_timestamp, qunit) {

  'use strict';

  qunit.module('Unit | Helper | convert iso to timestamp');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = convert_iso_to_timestamp.convertISOToTimestamp(42);
    assert.ok(result);
  });

});
define('admin-dashboard/tests/unit/helpers/convert-iso-to-timestamp-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/convert-iso-to-timestamp-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/convert-iso-to-timestamp-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/helpers/is-active-table-header-test', ['admin-dashboard/helpers/is-active-table-header', 'qunit'], function (is_active_table_header, qunit) {

  'use strict';

  qunit.module('Unit | Helper | is active table header');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = is_active_table_header.isActiveTableHeader(42);
    assert.ok(result);
  });

});
define('admin-dashboard/tests/unit/helpers/is-active-table-header-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/is-active-table-header-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/is-active-table-header-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/helpers/link-to-futon-user-test', ['admin-dashboard/helpers/link-to-futon-user', 'qunit'], function (link_to_futon_user, qunit) {

  'use strict';

  qunit.module('Unit | Helper | link to futon user');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = link_to_futon_user.linkToFutonUser(42);
    assert.ok(result);
  });

});
define('admin-dashboard/tests/unit/helpers/link-to-futon-user-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/link-to-futon-user-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/link-to-futon-user-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/routes/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:login', 'Unit | Route | login', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('admin-dashboard/tests/unit/routes/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/login-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/login-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/routes/logout-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:logout', 'Unit | Route | logout', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('admin-dashboard/tests/unit/routes/logout-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/logout-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/logout-test.js should pass jshint.'); 
  });

});
define('admin-dashboard/tests/unit/routes/plugins/usersnew-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:plugins/usersnew', 'Unit | Route | plugins/usersnew', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('admin-dashboard/tests/unit/routes/plugins/usersnew-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/plugins');
  test('unit/routes/plugins/usersnew-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/plugins/usersnew-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('admin-dashboard/config/environment', ['ember'], function(Ember) {
  var prefix = 'admin-dashboard';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("admin-dashboard/tests/test-helper");
} else {
  require("admin-dashboard/app")["default"].create({"name":"admin-dashboard","version":"0.0.0+c8b13532"});
}

/* jshint ignore:end */
//# sourceMappingURL=admin-dashboard.map