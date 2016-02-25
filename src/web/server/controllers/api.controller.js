var seneca = require("seneca")();

var userService = seneca.client({
    host: process.env.USERS_HOST,
    port: process.env.USERS_PORT,
    pin: {
        role: 'user',
        cmd: '*'
    }
});

module.exports = {
    testRoute: function (req, res, next) {
        userService.act({ role: 'user', cmd: 'create', username: "username" }, (err, user) => {
            console.log("userservice responded: ", user);
            if(err) return res.status(500).send();
            return res.status(200).send(user);
        });
    }
} 
