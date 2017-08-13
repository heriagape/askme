const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

var SECRET = CONFIG.JWT_SECRET;
var User = require('../models/User');

module.exports = function (router) {

    router.post('/login', function (req, res) {
        var password = req.body.password;
        var email = req.body.email;

        User.findOne({where: {email: email}}).then(function (user) {

            // if (err) throw err;
            // console.log(user.password_digest);

            if (user.authenticate(password)) {
                // console.log(user.username);

                var tokenData = {
                    username: user.username,
                    email: user.email
                };

                var token = jwt.sign(tokenData, SECRET, {
                    expiresIn: '2h' // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Successful login',
                    token: token,
                    user: user
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed.'
                });
            }
        });
    });

    router.get('/hello', function (req, res) {
        var username = req.params.username;
        res.json({message: "test complted!"})
    });

    return router;
};