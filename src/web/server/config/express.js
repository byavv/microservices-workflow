"use strict";

var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    path = require("path"),
    nconf = require("nconf")
   ;

module.exports = function (app) {    
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    if (nconf.get("NODE_ENV") === "development") {
        app.use(morgan("dev"));
    }
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride("_method"));

    app.use('/build/', express.static(path.join(process.cwd(), 'build')));

    app.use((err, req, res, next) => {
        var code = 500,
            msg = { message: "Internal Server Error" };
        switch (err.name) {
            case "UnauthorizedError":
                code = err.status;
                msg = undefined;
                break;
            case "BadRequestError":
            case "UnauthorizedAccessError":
            case "NotFoundError":
                code = err.status;
                msg = err.inner;
                break;
            default:
                break;
        }
        return res.status(code).json(msg);
    });
};

