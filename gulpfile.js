var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var util = require('gulp-util');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
  util.log(util.colors.red('Error'), error.message);  
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

// gulp.task('serve', function(done) {
//   gulp.src('')
//     .pipe(server({
//       livereload: {
//         enable: false,
//         filter: function(filePath, cb) {
//           if(/main.js/.test(filePath)) {
//             cb(true)
//           } else if(/style.css/.test(filePath)){
//             cb(true)
//           }
//         }
//       },
//       open: false
//     }));
// });

gulp.task('serve', function (cb) {
    nodemon({
        script  : 'server.js',
        watch   : ['js', 'html'],
        //...add nodeArgs: ['--debug=5858'] to debug 
        //..or nodeArgs: ['--debug-brk=5858'] to debug at server start
    }).on('start', function () {
        setTimeout(function () {
            livereload.changed();
        }, 2000); // wait for the server to finish loading before restarting the browsers
    })
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('nodemon', function() {
  // // listen for changes
  // livereload.listen();
  // // configure nodemon
  // nodemon({
  //   // the script to run the app
  //   script: 'server.js',
  //   ext: 'js'
  // }).on('restart', function(){
  //   // when the app has restarted, run livereload.
  //   gulp.src('server.js')
  //     .pipe(livereload())
  //     .pipe(notify('Reloading page, please wait...'));
  // })
  nodemon({
      script: 'server.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development'
      }
    })
      .on('start', ['watch'])
      .on('change', ['watch'])
      .on('restart', function () {
        console.log('restarted!');
      });
})


gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// gulp.task('default', ['build', 'serve', 'sass', 'watch']);
gulp.task('default', ['build', 'serve', 'sass', 'watch']);

