module.exports = function(app) {
  var express = require('express');
  var pluginsRouter = express.Router();

  pluginsRouter.get('/', function(req, res) {
    res.send({
      'plugins': [{
          id: 'hoodie-plugin-user',
          name: 'users'
        },{
          id: 'hoodie-plugin-appconfig',
          name: 'appconfig'
        }
      ]
    });
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

  app.use('/api/plugins', pluginsRouter);
};
