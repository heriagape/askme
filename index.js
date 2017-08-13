const CONFIG = require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const morgan = require('morgan');
const apiRoutes = express.Router();
const webRoutes = express.Router();


//+++++++++Controller Methods+++++++++++++++++++++++++++++++++++++++++++++
const users = require('./controllers/UserController');
const questions = require('./controllers/QuestionController');
const answers = require('./controllers/AnswerController');
const auth = require('./controllers/AuthController');

//========================================================================

//+++++++++Middleware+++++++++++++++++++++++++++++++++++++++++++++
const Auth_middleware = require('./middleware/Auth');

//========================================================================


//+++++++++App specific USES++++++++++++++++++++++++++++++++++++++++++++++
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api', Auth_middleware); // route-level middleware
app.use('/api', apiRoutes);
app.use('/', webRoutes);

//========================================================================

//+++++++++Using Controller Methods+++++++++++++++++++++++++++++++++++++++
// apiRoutes.use(Auth_middleware);

apiRoutes.use('/users/', users(apiRoutes));

webRoutes.use('/', auth(webRoutes)); // For Authentication stuff


//========================================================================



apiRoutes.get('/', function (req, res) {
    res.json({message: 'Welcome to the coolest API on earth!'});
});


webRoutes.get('/', function (req, res) {
    res.send('Hello World! - WebView');
});

app.listen(CONFIG.PORT, function () {
    console.log('Example app listening on port 3000!');
});
