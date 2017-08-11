const express = require('express');
const app = express();
var morgan  = require('morgan');

app.use(morgan('combined'));

require('./models/DBinit.js');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
