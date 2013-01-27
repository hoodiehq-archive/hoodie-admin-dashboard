// Generated by CoffeeScript 1.3.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

Hoodie.AccountRemote = (function(_super) {

  __extends(AccountRemote, _super);

  AccountRemote.prototype._sync = true;

  function AccountRemote(hoodie, options) {
    this.hoodie = hoodie;
    if (options == null) {
      options = {};
    }
    this._handlePullResults = __bind(this._handlePullResults, this);

    this._handlePushSuccess = __bind(this._handlePushSuccess, this);

    this._handleSignIn = __bind(this._handleSignIn, this);

    this.push = __bind(this.push, this);

    this.sync = __bind(this.sync, this);

    this.stopSyncing = __bind(this.stopSyncing, this);

    this.startSyncing = __bind(this.startSyncing, this);

    this.connect = __bind(this.connect, this);

    this.name = this.hoodie.account.db();
    if (this.hoodie.config.get('_remote.sync') != null) {
      this._sync = this.hoodie.config.get('_remote.sync');
    }
    options.prefix = '';
    AccountRemote.__super__.constructor.call(this, this.hoodie, options);
  }

  AccountRemote.prototype.connect = function() {
    var _this = this;
    return this.hoodie.account.authenticate().pipe(function() {
      return AccountRemote.__super__.connect.apply(_this, arguments);
    });
  };

  AccountRemote.prototype.disconnect = function() {
    this.hoodie.unbind('store:idle', this.push);
    return AccountRemote.__super__.disconnect.apply(this, arguments);
  };

  AccountRemote.prototype.startSyncing = function() {
    this.hoodie.config.set('_remote.sync', true);
    this.hoodie.on('account:signin', this._handleSignIn);
    this.hoodie.on('account:signout', this.disconnect);
    return AccountRemote.__super__.startSyncing.apply(this, arguments);
  };

  AccountRemote.prototype.stopSyncing = function() {
    this.hoodie.config.set('_remote.sync', false);
    this.hoodie.unbind('account:signin', this._handleSignIn);
    this.hoodie.unbind('account:signout', this.disconnect);
    return AccountRemote.__super__.stopSyncing.apply(this, arguments);
  };

  AccountRemote.prototype.sync = function(docs) {
    if (this.isContinuouslyPushing()) {
      this.hoodie.unbind('store:idle', this.push);
      this.hoodie.on('store:idle', this.push);
    }
    return AccountRemote.__super__.sync.apply(this, arguments);
  };

  AccountRemote.prototype.getSinceNr = function(since) {
    return this.hoodie.config.get('_remote.since') || 0;
  };

  AccountRemote.prototype.setSinceNr = function(since) {
    return this.hoodie.config.set('_remote.since', since);
  };

  AccountRemote.prototype.push = function(docs) {
    var promise;
    if (!$.isArray(docs)) {
      docs = this.hoodie.store.changedDocs();
    }
    return promise = AccountRemote.__super__.push.call(this, docs);
  };

  AccountRemote.prototype.on = function(event, cb) {
    event = event.replace(/(^| )([^ ]+)/g, "$1remote:$2");
    return this.hoodie.on(event, cb);
  };

  AccountRemote.prototype.one = function(event, cb) {
    event = event.replace(/(^| )([^ ]+)/g, "$1remote:$2");
    return this.hoodie.one(event, cb);
  };

  AccountRemote.prototype.trigger = function() {
    var event, parameters, _ref;
    event = arguments[0], parameters = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return (_ref = this.hoodie).trigger.apply(_ref, ["remote:" + event].concat(__slice.call(parameters)));
  };

  AccountRemote.prototype._handleSignIn = function() {
    this.name = this.hoodie.account.db();
    return this.connect();
  };

  AccountRemote.prototype._handlePushSuccess = function(docs, pushedDocs) {
    var _this = this;
    return function() {
      var doc, i, options, update, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = docs.length; _i < _len; i = ++_i) {
        doc = docs[i];
        update = {
          _rev: pushedDocs[i]._rev
        };
        options = {
          remote: true
        };
        _results.push(_this.hoodie.store.update(doc.$type, doc.id, update, options));
      }
      return _results;
    };
  };

  AccountRemote.prototype._handlePullResults = function(changes) {
    var doc, promise, _changedDocs, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _removeedDocs, _results,
      _this = this;
    _removeedDocs = [];
    _changedDocs = [];
    for (_i = 0, _len = changes.length; _i < _len; _i++) {
      doc = changes[_i].doc;
      doc = this.store.parseFromRemote(doc);
      if (doc._deleted) {
        _removeedDocs.push([
          doc, this.hoodie.store.remove(doc.$type, doc.id, {
            remote: true
          })
        ]);
      } else {
        _changedDocs.push([
          doc, this.hoodie.store.save(doc.$type, doc.id, doc, {
            remote: true
          })
        ]);
      }
    }
    for (_j = 0, _len1 = _removeedDocs.length; _j < _len1; _j++) {
      _ref = _removeedDocs[_j], doc = _ref[0], promise = _ref[1];
      promise.then(function(object) {
        _this.trigger('remove', object);
        _this.trigger("remove:" + doc.$type, object);
        _this.trigger("remove:" + doc.$type + ":" + doc.id, object);
        _this.trigger('change', 'remove', object);
        _this.trigger("change:" + doc.$type, 'remove', object);
        return _this.trigger("change:" + doc.$type + ":" + doc.id, 'remove', object);
      });
    }
    _results = [];
    for (_k = 0, _len2 = _changedDocs.length; _k < _len2; _k++) {
      _ref1 = _changedDocs[_k], doc = _ref1[0], promise = _ref1[1];
      _results.push(promise.then(function(object, objectWasCreated) {
        var event;
        event = objectWasCreated ? 'create' : 'update';
        _this.trigger(event, object);
        _this.trigger("" + event + ":" + doc.$type, object);
        if (event !== 'create') {
          _this.trigger("" + event + ":" + doc.$type + ":" + doc.id, object);
        }
        _this.trigger("change", event, object);
        _this.trigger("change:" + doc.$type, event, object);
        if (event !== 'create') {
          return _this.trigger("change:" + doc.$type + ":" + doc.id, event, object);
        }
      }));
    }
    return _results;
  };

  return AccountRemote;

})(Hoodie.Remote);
