'use strict';
var fs = require('fs');
fs.createReadStream('./config/.env_example')
    .pipe(fs.createWriteStream('./config/.env'));