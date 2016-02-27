'use strict';

var seneca = require('seneca')();
var mongo = require('mongoose');
var config = require("./config");

var mongoHost = process.env.MONGO_HOST || "mongo";
var brokerHost = process.env.BROKER_HOST || "broker";

var mqtt = require('mqtt').connect(`mqtt://${brokerHost}:1883`);

config.configure({
    cp: `mongodb://${mongoHost}:27017/workflow`
}).then((result) => {
    var User = mongo.model("User");

    seneca.add({ role: 'user', cmd: 'create' }, (args, callback) => {
        User.create({ username: args.username }, (err, user) => {
            if (err) {
                console.log("Mongo error", err)
                return callback(err)
            } else {
                mqtt.publish('logger', new Buffer(JSON.stringify(user)), { qos: 0, retain: true }, (err) => {
                    console.log("Published", user)
                    return callback(err, user.toJSON());
                });
            }
        })
    });

    seneca.add({ role: 'user', cmd: 'get' }, (args, callback) => {
        //TODO
    });

    seneca.add({ role: 'user', cmd: 'update' }, (args, callback) => {
        //TODO
    });

    seneca.add({ role: 'user', cmd: 'delete' }, (args, callback) => {
        //TODO
    }); 
    
    seneca.listen({ host: process.env.SERVICE_HOST || "localhost", port: +process.env.SERVICE_PORT || 10101 });
})


module.exports.seneca = seneca;
