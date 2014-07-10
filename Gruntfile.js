/*global module:false*/

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hoodie');

  // Project configuration.
  grunt.initConfig({

    pkg: require('./package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'src/script/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'src/style/**/*.scss', 'app/js/**/*.hbs'],
      tasks: ['sass', 'browserify:app', 'jshint'],
      options: {
        livereload: true
      }
    },

    hoodie: {
      start: {
        options: {
          callback: function (config) {
            grunt.config.set('cfg', config);
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '.tmp',
          hostname: '0.0.0.0',
          middleware: function (connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        },
        proxies: [
          {
            context: '/_api',
            host: '<%= cfg.stack.www.host %>',
            port: '<%= cfg.stack.www.port %>'
          }

        ]
      }
    },


    sass: {
      dist: {
        files: {
          'www/app.css': 'src/style/index.scss'
        }
      },
      dev: {
        files: {
          '.tmp/app.css': 'src/style/index.scss'
        }
      }
    },

    browserify: {
      vendor: {
        options: {
          shim: {
            jquery: {
              path: 'vendor/jquery/jquery.js',
              exports: '$'
            },
            lodash: {
              path: 'vendor/lodash/dist/lodash.js',
              exports: '_'
            },
            underscore: {
              path: 'vendor/underscore/underscore.js',
              exports: '_'
            },
            backbone: {
              path: 'vendor/backbone/backbone.js',
              exports: 'Backbone',
              depends: {
                underscore: 'underscore'
              }
            },
            'backbone.babysitter': {
              path: 'vendor/backbone.babysitter/lib/backbone.babysitter.js',
              exports: 'Backbone.Babysitter',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.wreqr': {
              path: 'vendor/backbone.wreqr/lib/backbone.wreqr.js',
              exports: 'Backbone.Wreqr',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.marionette': {
              path: 'vendor/backbone.marionette/lib/backbone.marionette.js',
              exports: 'Marionette',
              depends: {
                jquery: '$',
                backbone: 'Backbone',
                underscore: '_'
              }
            },
            gridster: {
              path: 'vendor/jquery.gridster.with-extras.js/index.js',
              exports: '$.fn.gridster',
              depends: {
                jquery: '$'
              }
            },
            barf: {
              path: 'node_modules/barf/dist/barf.js',
              exports: 'Backbone.Router',
              depends: {
                backbone: 'Backbone'
              }
            },
            'backbone.syphon': {
              path: 'vendor/backbone.syphon/lib/backbone.syphon.js',
              exports: 'Backbone.Syphon',
              depends: {
                backbone: 'Backbone'
              }
            }
          }
        },
        src: ['./vendor/*.js'],
        dest: '.tmp/vendor.js'
      },
      app: {
        options: {
          standalone: 'app',
          //debug: true,
          transform: [
            'hbsfy'
          ],
          alias: [
            './vendor/jquery/jquery.js:jquery',
            './vendor/lodash/dist/lodash.js:lodash',
            './vendor/underscore/underscore.js:underscore',
            './vendor/backbone/backbone.js:backbone',
            './vendor/backbone.babysitter/lib/backbone.babysitter.js:backbone.babysitter',
            './vendor/backbone.wreqr/lib/backbone.wreqr.js:backbone.wreqr',
            './vendor/backbone.marionette/lib/backbone.marionette.js:backbone.marionette',
            './vendor/jquery.gridster.with-extras.js/index.js:gridster',
            './vendor/backbone.syphon/lib/backbone.syphon.js:backbone.syphon'
          ],
          external: [
            './vendor/jquery/jquery.js',
            './vendor/lodash/dist/lodash.js',
            './vendor/underscore/underscore.js',
            './vendor/backbone/backbone.js',
            './vendor/backbone.babysitter/lib/backbone.babysitter.js',
            './vendor/backbone.wreqr/lib/backbone.wreqr.js',
            './vendor/backbone.marionette/lib/backbone.marionette.js',
            './vendor/jquery.gridster.with-extras.js/index.js',
            './vendor/backbone.syphon/lib/backbone.syphon.js'
          ]
        },
        src: ['src/script/init.js'],
        dest: '.tmp/pocket.js',
      }
    },

    uglify: {
      dist: {
        files: {
          'www/vendor.js': '.tmp/vendor.js',
          'www/pocket.js': '.tmp/pocket.js'
        }
      }
    },

    copy: {
      dev: {
        files: {
          '.tmp/index.html': 'src/index.html'
        }
      },
      dist: {
        files: {
          'www/index.html': 'src/index.html'
        }
      }
    },

    clean: {
      dev: {
        src: ['.tmp/']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'copy:dist', 'sass:dist', 'browserify', 'uglify']);

  grunt.registerTask('serve', [
    'clean:dev',
    'hoodie',
    'connect:server',
    'configureProxies:server',
    'copy:dev',
    'sass:dev',
    'browserify',
    'watch'
  ]);
};
