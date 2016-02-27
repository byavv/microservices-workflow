"use strict";
var express = require("express"),
    chalk = require("chalk"),
    config = require("./config/config"),
    nconf = require("nconf");
    
config
    .default()
    .environment()
    .then(() => {
        let app = express();
        require("./config/express")(app);
        require("./routes/routes")(app);
        let port = nconf.get("SERVICE_PORT") || 3030; 
        app.listen(port);
        console.info(chalk.green(`Server started on http port:  ${port}`));
    })
    .catch((error) => {
        console.error(chalk.bgRed.white(`Crush ${error}`));
    });