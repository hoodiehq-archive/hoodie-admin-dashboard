module.exports = function(app) {
  var express = require('express');
  var pluginsRouter = express.Router();

  pluginsRouter.get('/', function(req, res) {
    res.send([
        {
          "name":"appconfig",
          "title":"appconfig",
          "description":"Hoodie plugin for editing global app config",
          "version":"2.0.1"
        },{
          "name":"email",
          "title":"email",
          "description":"Hoodie plugin that sends multipart emails",
          "version":"1.0.0"
        },{
          "name":"users",
          "title":"users",
          "description":"Hoodie plugin for handling user accounts and dbs",
          "version":"2.2.2"
        }
      ]
    );
  });

  pluginsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  pluginsRouter.get('/:id', function(req, res) {
    res.send({
      'plugins': {
        id: req.params.id
      }
    });
  });

  pluginsRouter.put('/:id', function(req, res) {
    res.send({
      'plugins': {
        id: req.params.id
      }
    });
  });

  pluginsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/_api/_plugins', pluginsRouter);
};
