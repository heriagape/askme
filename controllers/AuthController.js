const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(cookieParser());

var SECRET = 'shhhhhhared-secret';



var User = require('../models/User');

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
                expiresIn: '10s' // expires in 24 hours
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

module.exports = router;