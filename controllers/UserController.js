var express = require('express');
var router = express.Router();

const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const jwt               = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

var User = require('../models/User');
var Question = require('../models/Question');
var Answer = require('../models/Answer');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/', function(req, res) {
    User.findAll().then(function(users) {
        res.json(users);
    });
});

router.post('/', function (req, res) {
    User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username
    }).then(function (user) {
        res.json(user);
    });
});

router.get('/:username', function(req, res) {
    var username = req.params.username;
    User.findOne({ where: {username: username} }).then(function (user){
        res.json(user);
    });
});

router.put('/:username', function(req, res) {
    var username = req.params.username;
    var _token = req.body.token;
    User.findOne({ where: {username: username} }).then(function (user){
        user.updateAttributes({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username
        });
        res.json(user);
    });
});

router.delete('/:username', function(req, res) {
    var username = req.params.username;
    var _token = req.body.token;
    User.destroy({ where: {username: username} }).then(function (deleted){
        res.json({
            success: deleted,
            message: "User has been deleted"
        });
    });
});

// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;