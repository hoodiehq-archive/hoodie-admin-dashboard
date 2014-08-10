var page = require('webpage').create();
page.viewportSize = {
  width: 1280,
  height: 800
};
page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};

page.onConsoleMessage = function(msg) {
  console.log('CONSOLE: ' + msg);
};

page.onAlert = function(msg) {
  console.log('ALERT: ' + msg);
};

page.open('http://localhost:9000/', function() {
  page.evaluate(function() {
    // uncomment the lines below and all of the sudden – it works?!
    // console.log($('[data-state] [data-component=login]').is(':visible'));
    // document.body.innerHTML = document.body.innerHTML;
    // console.log($('[data-state] [data-component=login]').is(':visible'));
  });

  page.render('debug.png');
  phantom.exit();
});
