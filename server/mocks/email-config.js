module.exports = function(app) {
  var express = require('express');
  var emailConfigRouter = express.Router();

  emailConfigRouter.get('/', function(req, res) {
    res.send({
      'email-config': {
        'id': 'emailConfig',
        'outgoing':{
          'default-from-address': 'desk@minutes.io',
          'service': {
            'id':'sendgrid',
            'text': 'SendGrid'
          },
          'available-services': [
            {
              'id':'googlemail',
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
        'email-template':['confirmation', 'welcome', 'passwordreset']
      },
      'email-template': [
        {
          'id': 'confirmation',
          'name': 'Confirmation',
          'text': 'Dear {account.username},\n\nyou can reset your password at:\n{reseturi}/{resettoken}',
          'description': 'Sent when a new user has signed up and needs to verify their account.'
        }, {
          'id': 'welcome',
          'name': 'Welcome',
          'text': 'Hello there, {account.username}!\n\nThanks so much for joining minutes.io. If you ever have any questions, please contact us at help@minutes.io!',
          'description': 'Sent after a user has completed signup successfully.'
        }, {
          'id': 'passwordreset',
          'name': 'Password reset',
          'text': 'Dear {account.username},\n\nyour confirmation code is {token}',
          'description': 'Sent when the user requests a password reset'
        }
      ]
    });
  });

  emailConfigRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  emailConfigRouter.get('/:id', function(req, res) {
    res.send({
      'email-config': {
        id: req.params.id
      }
    });
  });

  emailConfigRouter.put('/:id', function(req, res) {
    res.send({
      'email-config': {
        id: req.params.id
      }
    });
  });

  emailConfigRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/emailConfigs', emailConfigRouter);
};
