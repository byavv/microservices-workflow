'use strict';

var seneca = require('seneca')();
var mongo = require('mongoose');
var config = require("./config");

var mqtt = require('mqtt').connect('mqtt://broker:1883');


config.configure({
    cp: 'mongodb://mongo:27017/workflow'
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

    });

    seneca.add({ role: 'user', cmd: 'update' }, (args, callback) => {

    });

    seneca.add({ role: 'user', cmd: 'delete' }, (args, callback) => {

    }); 

    //add networking
    seneca.listen({ host: process.env.SERVICE_HOST, port: process.env.SERVICE_PORT });
})


module.exports.seneca = seneca;
