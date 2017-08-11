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

// define the home page route
router.get('/', function(req, res) {
    res.send('Birds home page');
});

// define the about route
router.get('/about', function(req, res) {
    res.send('About birds');
});

module.exports = router;