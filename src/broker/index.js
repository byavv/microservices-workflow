'use strict';

var mosca = require('mosca');

var servicePort = process.env.SERVICE_PORT || '1883';
var serviceHost = process.env.SERVICE_HOST || '0.0.0.0';

var pubsubsettings = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    host: "redis"
};

var settings = {
    host: serviceHost,
    port: +servicePort,
    backend: pubsubsettings
};

var server = new mosca.Server(settings, (err)=>{
    if(err) throw err;
});

function setup() {
    console.log(`Mosca server is up and running on ${serviceHost}:${servicePort}`)
}
server.on('published', (packet, client) => {

});

server.on('ready', setup);
