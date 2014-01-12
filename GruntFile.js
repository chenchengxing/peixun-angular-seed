module.exports = function ( grunt ) {
  // body...
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-recess');
  grunt.task.loadNpmTasks('yt');

  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './user.config.js' );

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),
    clean: [
      '<%= build_dir %>',
      'bin'
    ],
    copy: {
      buildCopyApp: {
        files: [
          {
            src: [ 'src/**' , '!src/index.html' , '!src/app/**/*.tpl.html', '!src/app/**/*.spec.js', '!src/app/app-templates.js'  ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
       ]
      },
      buildVendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>'],
            dest: '<%= build_dir %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      buildBootstrap: {
        files: [{
          src: [ 'vendor/bootstrap/img/*.png'],
          dest: 'build/assets',
          cwd: '.',
          expand: true,
          flatten: true
        }]
      },
      buildIndex: {
        files: [
          {
            src: ['src/index.html'],
            dest: '<%= build_dir %>',
            cwd: '.',
            expand: true,
            flatten: true
          }
        ]
      },
      buildCopyAssets: {
        files: [
          {
            src: [ 'assets/**'],
            dest: '<%= build_dir %>',
            cwd: './src',
            expand: true
          }
        ]
      },
      compileCopyApp: {
        files: [
          {
            src: [ '!*.spec.js', '**/*.js', '!**.js' ],
            dest: 'bin/',
            cwd: './src/app',
            expand: true
          }
       ]
      },
      compileCopyAssets: {
        files: [
          {
            src: [ 'assets/**'],
            dest: 'bin',
            cwd: './src',
            expand: true
          }
        ]
      }
    },
    watch: {
      hint: {
        options: {
          livereload: true
        },
        files: [
          'src/**/*.js', 'src/index.html', 'src/**/*.tpl.html', 'Gruntfile.js', '!src/**/*.spec.js'
        ],
        // tasks: [ 'clean', 'html2js', 'copy', 'jshint']
        tasks: ['jshint', 'build']
      },
      spec: {
        options: {

        },
        files: [
          'src/**/*.spec.js'
        ],
        tasks: [ 'jshint' ]
      }
    },
    html2js: {
      options: {
        base: 'src/app',
        module: 'app-templates'
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: '<%= build_dir %>/src/app/app-templates.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    /**
     * `jshint` 定义了那些代码将会被执行代码检测（jslint），定义了代码检测的规则
     * 注意：这里定义的规则只允许在项目开始前修改，而且不推荐修改. 如需修改，修改options里的参数
     × options的配置参见 http://www.jshint.com/docs/
     * js代码规范参见：https://github.com/rwaldron/idiomatic.js/blob/master/readme.md

     ## why eqeqeq: http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/
     */
    jshint: {
      src: [
        'src/**/*.js'
      ],
      // test: [
      //   '<%= app_files.jsunit %>'
      // ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,   //
        noarg: true,   //禁止使用arguments.caller and arguments.callee
        sub: true, //允许使用 $scope['name'] ,而不仅仅$scope.name
        eqnull: true, //允许使用 == null
        eqeqeq: true,
        trailing: true
      },
      globals: {}
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: "./src/app",
          mainConfigFile: "src/app/main.js",
          out: "bin/px-min.js"

        }
      },
      build: {
        optimizeCss: "standard.keepLines",
        cssIn: "src/css/app.css",
        out: "path/to/css-optimized.css"
      }
    },
    index: {
      compile: {
        dir: 'bin'
      },
      build: {
        dir: 'build'
      }

    },
    bootstrap: {
        build: {
          src: []
        }
    },
    concat: {
      compile: {
        src: [ 'vendor/requirejs/require.js', 'bin/px-min.js'],
        dest: 'bin/px-min.js'
      },
      buildCss: {
        src: [ 'vendor/bootstrap/css/bootstrap.css', 'src/**/*.css'],
        dest: 'build/assets/all.css'
      }
    },
    recess: {
      build: {
        src: [ 'src/css/app.css' ],
        dest: 'build/assets/all.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      },
      compile: {
        src: [ '<%= recess.build.dest %>' ],
        dest: '<%= recess.build.dest %>',
        options: {
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      }
    }
  };
  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );
  grunt.registerTask('watch1', [ 'watch' ]);
  grunt.registerTask('test', [ 'karma' ]);
  grunt.registerTask('default', ['clean', 'copy', 'html2js']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('watchHint', ['watch:hint']);
  grunt.registerTask('build', ['copy', 'index:build', 'html2js', 'concat:buildCss', 'bootstrap:build']);
  grunt.registerTask('compile', ['requirejs', 'index:compile', 'concat:compile', 'copy:compileCopyApp', 'copy:compileCopyAssets']);


  grunt.registerMultiTask('bootstrap', 'modify bootstrap icons png path to assets', function () {

    grunt.file.copy('build/assets/all.css', 'build/assets/all.css', {
      process: function ( contents, path ) {
        return contents.replace(/\.\.\/img\/glyphicons-halflings/g, '.\/glyphicons-halflings');
      }
    });
  });

  grunt.registerMultiTask('index', 'replace js', function () {
    var dir = this.data.dir;
    grunt.file.copy('src/index.html', dir + '/index.html', {
      process: function ( contents, path ) {
        if ( dir === 'build') {
          return grunt.template.process( contents, {
            data: {
              compiledJs: '<script src="vendor/requirejs/require.js" data-main="src/app/main"></script>'
            }
          });
        }
        return grunt.template.process( contents, {
          data: {
            compiledJs: '<script src="px-min.js"></script>'
          }
        });
      }
    });
  });
  /*below for test*/
  // grunt.initConfig({
  //   log: {
  //     foo: [1, 2, 3],
  //     bar: 'hello world',
  //     baz: false
  //   }
  // });

  // grunt.registerMultiTask('log', 'Log stuff.', function() {
  //   grunt.log.writeln(this.target + ': ' + this.data);
  // });
};