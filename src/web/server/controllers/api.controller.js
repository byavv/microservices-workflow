var seneca = require("seneca")();

var userService = seneca.client({
    // NOTE! this variables are set only when service starts within a container
    host: process.env.USERS_HOST || "localhost",
    port: +process.env.USERS_PORT || 3031, // 3031 - exported port of users service, running within a container 
    pin: {
        role: 'user',
        cmd: '*'
    }
});

module.exports = {
    testRoute: (req, res) => {
        userService.act({ role: 'user', cmd: 'create', username: "username" }, (err, user) => {
            console.log("userservice responded: ", user);
            if (err) return res.status(500).send();
            return res.status(200).send(user);
        });
    }
} 
