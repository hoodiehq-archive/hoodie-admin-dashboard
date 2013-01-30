(function() {
  var MODULES,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MODULES = [
    {
      name: "users",
      status: "success"
    }, {
      name: "sharings",
      status: "success"
    }, {
      name: "email-out",
      status: "success"
    }, {
      name: "logs",
      status: "error",
      messages: ["Dummy error message", "Dummy error message"]
    }
  ];

  Hoodie.AdminModules = (function(_super) {

    __extends(AdminModules, _super);

    AdminModules.prototype.name = 'modules';

    function AdminModules(hoodie, admin) {
      this.hoodie = hoodie;
      this.admin = admin;
      this.findAll = __bind(this.findAll, this);

      this.find = __bind(this.find, this);

      AdminModules.__super__.constructor.apply(this, arguments);
    }

    AdminModules.prototype.find = function(moduleName) {
      return this.store.find("module", moduleName);
    };

    AdminModules.prototype.findAll = function() {
      return this.store.findAll('module');
    };

    AdminModules.prototype.getConfig = function(moduleName) {
      return this.hoodie.resolveWith({
        email: {
          transport: {
            host: "",
            port: 465,
            auth: {
              user: "@gmail.com",
              pass: ""
            },
            secureConnection: true,
            service: "Gmail"
          }
        }
      });
    };

    AdminModules.prototype.setConfig = function(moduleName, config) {
      if (config == null) {
        config = {};
      }
      return this.hoodie.resolveWith(config);
    };

    return AdminModules;

  })(Hoodie.Remote);

}).call(this);
