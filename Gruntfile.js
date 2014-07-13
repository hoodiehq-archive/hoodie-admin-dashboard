/*global module:false*/

var shims = require('./config/shims');
var sharedModules = Object.keys(shims);

module.exports = function (grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);

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
          transform: ['browserify-shim'],
          require: sharedModules
        },
        src: ['./vendor/*.js'],
        dest: '.tmp/vendor.js'
      },
      app: {
        options: {
          transform: ['hbsfy'],
          external: sharedModules
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
    },

    release: {
      bump: {
        commitFiles: [
          'package.json',
          'bower.json',
          'CHANGELOG.md',
          'www/*'
        ]
      },
      dotfiles: false
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
