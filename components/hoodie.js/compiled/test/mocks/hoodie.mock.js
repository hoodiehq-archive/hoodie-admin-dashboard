// Generated by CoffeeScript 1.3.3
var promiseMock;

window.Mocks || (window.Mocks = {});

promiseMock = {
  pipe: function() {},
  fail: function() {},
  done: function() {},
  then: function() {}
};

Mocks.Hoodie = function() {
  return {
    baseUrl: 'http://my.cou.ch',
    trigger: function() {},
    request: function() {},
    open: function() {},
    on: function() {},
    one: function() {},
    unbind: function() {},
    defer: $.Deferred,
    isPromise: Hoodie.prototype.isPromise,
    uuid: function() {
      return 'uuid';
    },
    resolveWith: function() {
      return 'resolved';
    },
    rejectWith: function() {
      return 'rejected';
    },
    store: {
      add: function() {
        return promiseMock;
      },
      remove: function() {
        return promiseMock;
      },
      save: function() {
        return promiseMock;
      },
      update: function() {
        return promiseMock;
      },
      updateAll: function() {
        return promiseMock;
      },
      find: function() {
        return promiseMock;
      },
      findAll: function() {
        return promiseMock;
      },
      findOrAdd: function() {
        return promiseMock;
      },
      removeAll: function() {
        return promiseMock;
      },
      changedDocs: function() {},
      isDirty: function() {},
      decoratePromises: function() {},
      db: {
        getItem: function() {},
        setItem: function() {},
        removeItem: function() {}
      }
    },
    account: {
      authenticate: function() {
        return promiseMock;
      },
      db: function() {},
      on: function() {},
      ownerHash: 'owner_hash',
      hasAccount: function() {},
      anonymousSignUp: function() {}
    },
    config: {
      set: function() {},
      get: function() {},
      remove: function() {},
      clear: function() {}
    },
    remote: {
      connect: function() {},
      disconnect: function() {},
      sync: function() {},
      on: function() {},
      one: function() {},
      trigger: function() {}
    },
    share: {
      add: function() {
        return promiseMock;
      },
      remove: function() {
        return promiseMock;
      },
      save: function() {
        return promiseMock;
      },
      update: function() {
        return promiseMock;
      },
      updateAll: function() {
        return promiseMock;
      },
      find: function() {
        return promiseMock;
      },
      findAll: function() {
        return promiseMock;
      },
      findOrAdd: function() {
        return promiseMock;
      },
      removeAll: function() {
        return promiseMock;
      },
      request: function() {
        return promiseMock;
      }
    }
  };
};
