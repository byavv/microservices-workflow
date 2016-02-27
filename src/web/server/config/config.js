"use strict";

var path = require("path"),
    fs = require("fs"),
    nconf = require("nconf"),
    chalk = require("chalk"),
    defaultConf = require("./defaults");

/**
 * Add environment specific configuration
 */
let config = {
    environment: () => {
        let env = nconf.get("NODE_ENV") || "development";
        let configPath = path.join(__dirname, './env');
        return new Promise((resolve, reject) => {
            fs.readdir(configPath, (err, files) => {
                if (err) reject(err);
                files.forEach((file) => {
                    if (file.match(new RegExp(env))) {
                        nconf.overrides(require(configPath + '/' + file));
                        console.info(chalk.underline(`
                            Configuration for ${chalk.white.bgBlue(env.toUpperCase()) } mode was built
                        `));
                    }
                });
                return resolve();
            });
        });
    },
    default: () => {
        nconf.argv().env();
        nconf.defaults(defaultConf);
        nconf.file("app", {
            file: 'config.json',
            dir: __dirname,
            search: true
        });
        return config;
    }
};

module.exports = config;


