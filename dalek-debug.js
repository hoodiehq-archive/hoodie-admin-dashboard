module.exports = {
  'Google Page title is "Google"': function (test) {
    test
      .open('http://google.com')
      .assert.title().is('Google', 'It has title')
      .done();
  },

  'Login to admin dashboard': function(test) {
    test
      .open('http://localhost:9000')
      .type('[name=password]', 'funkyfresh')
      .click('[type=submit]')
      .assert.visible('[data-component=content]')
      done();
  }
};
