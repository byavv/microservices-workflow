module.exports = function (app) {	
	require("./api.routes")(app);	
	app.route('*').get((req, res) => { res.render('index'); });		
};
