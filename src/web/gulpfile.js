var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    webpack = require('webpack'),
    path = require('path'),
    runSequence = require('run-sequence'),
    chalk = require('chalk'),
    nodemon = require('gulp-nodemon');


gulp.task('clean:build', (done) => {
    require('rimraf')('./build', done);
});
gulp.task("build:client", ["build:vendors"], (done) => {
    var config = require("./webpack.config")().client
    webpack(config).run(onWebpackCompleted(done));
});
gulp.task("build:vendors", (done) => {
    var config = require("./webpack.config")().vendors
    webpack(config).run(onWebpackCompleted(done));
});
gulp.task("build", ["clean:build"], (done) => {
    runSequence(['build:client'], done)
});
gulp.task('default', () => {
    var nodemonRef;
    var clientConfig = require("./webpack.config")().client;
    webpack(clientConfig).watch(100, onWebpackCompleted((err) => {
        nodemonRef
            ? nodemonRef.restart()
            : nodemonRef = nodemon({
                script: path.join(__dirname, '/server/index.js'),
            });
    }));
});

gulp.task("test", (done) => {
    runSequence(['test:server'], done)
});

gulp.task("test:server", [], (done) => {
    var mochaError;
    gulp.src(['./test/**/*.spec.js'], { read: false })
        .pipe($.mocha({
            reporter: 'spec'
        }))
        .on('error', (err) => {
            mochaError = err;
        })
        .on('end', () => {
            if (mochaError) {
                $.util.log($.util.colors.bgRed('ERROR:'), $.util.colors.red(mochaError.message));
                process.exit(1);
            }
            $.util.log($.util.colors.white.bgGreen.bold('INFO:'), 'Mocha completed');
            process.exit();
        });
});

function onWebpackCompleted(done) {
    return (err, stats) => {
        if (err) {
            $.util.log($.util.colors.bgRed('ERROR:'), $.util.colors.red(err));
        } else {
            var stat = stats.toString({ chunks: false, colors: true });
            console.log(stat + '\n');
        }
        if (done) {
            done(err);
        }
    }
}