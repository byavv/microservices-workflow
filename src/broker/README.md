## Description

* Simple message brocker made with mosca


## Dependencies
* Depends on redis microservice

## Usage

```javascript
var mqttServer = require('mqtt').connect(`mqtt://brokerHost:1883`);

mqttServer.on('connect', () => {
    mqtt.subscribe('my_message', () => {
       // do smth
    });
});

mqttServer.on('message', (topic, payload) => {
   var message = JSON.parse(payload);
   console.log('message received', message);
});

 
// in other process
var mqttClient = require('mqtt').connect(`mqtt://brokerHost:1883`);
mqttClient.publish('my_message', 
    new Buffer(JSON.stringify({test:"message"})), 
    { qos: 0, retain: true }, 
    (err) => {                   
        // do smth
    });

```

