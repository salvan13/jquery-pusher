module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        browser: true
      },
      all: ['jquery.pusher.js']
    },
    removelogging: {
      dist: {
        src: "jquery.pusher.js",
        dest: "jquery.pusher.clean.js"
      },
      options: {
        namespace: 'window.console'
      }
    },
    uglify: {
      minify: {
        files: {
          'jquery.pusher.min.js': ['jquery.pusher.clean.js']
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\nhttps://github.com/salvan13/jquery-pusher\nOriginal author: Antonio Salvati - @salvan13 - salvan13@gmail.com\nLicensed under the MIT license\n */\n'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['jquery.pusher.js'], dest: 'demos'},
          {expand: true, src: ['jquery.pusher.min.js'], dest: 'demos'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-remove-logging");
  
  // Default task.
  grunt.registerTask('default', ['jshint', 'removelogging', 'uglify', 'copy']);

};
