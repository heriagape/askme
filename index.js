const express           = require('express');
const app               = express();
const morgan            = require('morgan');
const apiRoutes         = express.Router();
const webRoutes         = express.Router();

//+++++++++Controller Methods+++++++++++++++++++++++++++++++++++++++++++++
const users             = require('./controllers/UserController');
const questions         = require('./controllers/QuestionController');
const answers           = require('./controllers/AnswerController');
const auth              = require('./controllers/AuthController');

//========================================================================


//+++++++++Using Controller Methods+++++++++++++++++++++++++++++++++++++++
apiRoutes.use('/users', users);
apiRoutes.use('/questions', questions);
apiRoutes.use('/answers', answers);
webRoutes.use('/', auth); // For Authentication stuff


//========================================================================


//+++++++++App specific USES++++++++++++++++++++++++++++++++++++++++++++++
app.use(morgan('tiny'));

//========================================================================




apiRoutes.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
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

    } else {
        return res.status(403).send({
            success: false,
            message: 'Need to be Authenticated'
        });
    }


    console.log('Something is happening.');
    next();
});




app.use('/api', apiRoutes);
app.use('/', webRoutes);



apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});


webRoutes.get('/', function (req, res) {
    res.send('Hello World! - WebView');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
