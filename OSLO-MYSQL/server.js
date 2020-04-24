const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyparser = require('body-parser');
const mysqlConnection = require('./connection');
const Description = require('./AppRoute/description');
const port = 4500;
const path = require('path');
var app = express();

app.use(bodyparser.json());

// Templating engine
app.set('views' ,path.join(__dirname,'Views'));
app.set('view engine', 'pug');

app.use('/description',Description);

//Without HTTPS
//app.listen(port);

// WITH HTTPS
const httpsOptions = {
    key: fs.readFileSync('./devserver.key'),
    cert: fs.readFileSync('./devserver.cert')
};
https.createServer(httpsOptions,app).listen(port,()=>{
    console.log('Listening https on Port ' + port);
});