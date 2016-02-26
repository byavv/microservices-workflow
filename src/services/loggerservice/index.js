'use strict';
var brokerHost = process.env.BROKER_HOST || "broker";
var mqtt = require('mqtt').connect(`mqtt://${brokerHost}:1883`);
var seneca = require('seneca')();

mqtt.on('connect', () => {
    mqtt.subscribe('logger', () => {
        console.log('subscribed on logger messages');
    });
});

mqtt.on('message', (topic, payload) => {
    console.log('message received');
    try {
        var message = JSON.parse(payload);
        console.log('new message', message);
    }
    catch (err) {
        console.log(err);
        return;
    }
});

seneca.add({ role: 'logger', cmd: 'log' }, (args, callback) => {
    console.log('new message', args.message);
});

seneca.listen({ host: process.env.SERVICE_HOST, port: process.env.SERVICE_PORT });

module.exports.seneca = seneca;