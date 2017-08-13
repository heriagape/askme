const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

var SECRET = CONFIG.JWT_SECRET;

var User = require('../models/User');
var Question = require('../models/Question');
var Answer = require('../models/Answer');



module.exports = function (router) {

    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });


    router.get('/all/', function(req, res) {
        User.findAll().then(function (users) {
            res.json(users);
        })
    });

    router.post('/', function (req, res) {
        // var data = req.body;
        User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            password_confirmation: req.body.password_confirmation
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
        User.findOne({ where: {username: username} }).then(function (user){
            user.update({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation
            });
            res.json(user);
        });
    });

    router.delete('/:username', function(req, res) {
        var username = req.params.username;
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

    return router;
};