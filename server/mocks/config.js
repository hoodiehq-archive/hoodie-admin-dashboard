module.exports = function(app) {
  var express = require('express');
  var configRouter = express.Router();

  configRouter.get('/', function(req, res) {
    res.send({
      'config': {
        'email': {
          'outgoing':{
            'defaultfromaddress': 'desk@minutes.io',
            'service': {
              'id':'sendgrid',
              'text': 'SendGrid'
            },
            'availableservices': [
              {
                'id':'google mail',
                'text': 'Google Mail'
              }, {
                'id':'mailgun',
                'text': 'Mailgun'
              }, {
                'id':'mandrill',
                'text': 'Mandrill'
              }, {
                'id':'postmark',
                'text': 'Postmark'
              }, {
                'id':'sendgrid',
                'text': 'SendGrid'
              }],
            'auth': {
              'username': 'testmail@testservice.com',
              'password': 'testpassword'
            }
          },
          'templates': [
            {
              'name': 'Confirmation',
              'type': 'confirmation',
              'text': 'Dear {account.username},\n\nyou can reset your password at:\n{reseturi}/{resettoken}',
              'description': 'Sent when a new user has signed up and needs to verify their account.'
            }, {
              'name': 'Welcome',
              'type': 'welcome',
              'text': 'Hello there, {account.username}!\n\nThanks so much for joining minutes.io. If you ever have any questions, please contact us at help@minutes.io!',
              'description': 'Sent after a user has completed signup successfully.'
            }, {
              'name': 'Password reset',
              'type': 'passwordreset',
              'text': 'Dear {account.username},\n\nyour confirmation code is {token}',
              'description': 'Sent when the user requests a password reset'
            }
          ]
        }
      }
    });
  });

  configRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  configRouter.get('/:id', function(req, res) {
    res.send({
      'config': {
        id: req.params.id
      }
    });
  });

  configRouter.put('/:id', function(req, res) {
    res.send({
      'config': {
        id: req.params.id
      }
    });
  });

  configRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/_api/_config', configRouter);
};
