var HoodieAdminClass = function(hoodie) {
    this.hoodie = hoodie;
}

HoodieAdminClass.prototype = {
    users: {
        findAll: function() {},
        search: function() {}
    },
    config: {
        get: function() {},
        set: function() {}
    },
    on: function() {},
    logs: {
        findAll: function() {}
    },
    stats: {}
};

Hoodie.extend('admin', HoodieAdminClass);
