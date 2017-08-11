var express = require('express');
var router = express.Router();

const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const jwt               = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

var User = require('../models/User');

router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    console.log("Hello");
    User.findOne({ where: {
        $or: [{username: username}, {email: email}]
    } }).then(function (err, user, password){

        if (err) throw err;

        if (user.authenticate(password)) {
            var token = jwt.sign(user, app.get('superSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            res.json({
                success: true,
                message: 'Successful login',
                token: token,
                user: user
            });
        }else {
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