var path = require('path');

module.exports = function(config) {
  var testWebpackConfig = require('./webpack.config.js')().test;
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    files: [ { pattern: 'spec.bundle.js', watched: false } ],
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'html' }
      ],
    },
    webpackServer: { noInfo: true },
    reporters: [ 'progress', 'coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ 'PhantomJS' ],
    singleRun: true
  });

};