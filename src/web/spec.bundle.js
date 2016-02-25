
Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('es6-promise');
require('es6-shim');
require('es7-reflect-metadata/dist/browser');

require('zone.js/dist/zone-microtask');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');




var appContext = require.context('./client', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

var domAdapter = require('angular2/src/platform/browser/browser_adapter');
domAdapter.BrowserDomAdapter.makeCurrent();