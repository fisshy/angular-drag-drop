module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['src/*.js']
      },
    },
    clean: {
      dist:   ['angular-dnd.js', 'angular-dnd.min.js', 'angular-dnd.min.js.map']
    },
    concat: {
      options: {
        separator: "\n\n",
      },
      dist: {
        src: [
          'src/angular-dnd.js',
        ],
        dest: 'angular-dnd.js',
      },
    },
    ngmin: {
      dist: {
        src: ['angular-dnd.js'],
        dest: 'angular-dnd.min.js'
      }
    },
    uglify: {
      dist: {
        options: {
          report: 'gzip', 
          sourceMap: 'angular-dnd.min.js.map'
        },
        files: {
          'angular-dnd.min.js': ['angular-dnd.min.js']
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'ngmin', 'uglify']);
};