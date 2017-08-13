const CONFIG = require('../config/config');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var SECRET = CONFIG.JWT_SECRET;

module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'Need to be Authenticated'
        });
    } else {
        // verifies secret and checks exp
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    }
    console.log('Running Auth Middleware');
    next();
};