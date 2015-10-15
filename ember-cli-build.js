/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var concat = require('broccoli-concat');
var uglifyJS = require('broccoli-uglify-js');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    outputPaths: {
        app: {
          css: {
            'app': '/assets/hoodie-admin-dashboard.css',
            'uikit': '/assets/uikit.css',
            'uikit-guide': '/assets/uikit-guide.css'
          }
        }
      }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // The JS files get appended to www/assets/vendor.js, which already includes ember
  app.import('bower_components/bootstrap/js/modal.js');

  // Copy the UIKit guide files over to www
  var guide = new Funnel('guide', {
    destDir: 'guide'
  });

  // Copy the Select2 image files over to www
  var select2 = new Funnel('bower_components/select2', {
    include: ['*.png', '*.gif'],
    destDir: 'assets'
  });

  // Copy the dropzone image files over to www
  var dropzone = new Funnel('bower_components/dropzone/downloads', {
    include: ['*.png'],
    destDir: 'assets'
  });

  // Copy prism over to assets
  var prism = new Funnel('bower_components/prism', {
    include: [
      'prism.js',
      'themes/prism.css'
    ],
    destDir: 'assets',
    getDestinationPath: function(relativePath) {
      if (relativePath === 'themes/prism.css') {
        return 'prism.css';
      }
      return relativePath;
    }
  });

  // Copy icheck sprites over to assets
  var icheck = new Funnel('bower_components/jquery-icheck', {
    include: [
      'skins/flat/green*.png'
    ],
    destDir: 'assets',
    getDestinationPath: function(relativePath) {
      return relativePath.split('/').reverse()[0];
    }
  });

  // Everything that needs to go into UIKit.js is
  // concatenated and minified here, everytime $ember build is run
  // TODO: should maybe include bootstrap js files
  //
  // IMPORTANT: concat produces a weird error when passing in the root folder as the
  // first argument ('.'), and then having inputfiles from two different immediate
  // subfolders of that root, i.e. `bower_components` and `vendor`.
  // Hence this weird '../vendor' construction
  var UIKitJS = concat('bower_components', {
    inputFiles: [
      'jquery/dist/jquery.js',
      'jquery-icheck/icheck.js',
      'dropzone/downloads/dropzone.js',
      'select2/select2.js',
      '../vendor/uikit-init.js'
    ],
    outputFile: '/assets/uikit.js'
  });

  UIKitJS = uglifyJS(UIKitJS, {
    compress: true
  });

  return app.toTree([UIKitJS, guide, prism, icheck, select2, dropzone]);
};
