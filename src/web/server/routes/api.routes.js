'use strict';
var api = require('../controllers/api.controller');  

module.exports = function (app) {
	app.route("/api/test").post(api.testRoute);	
}; 