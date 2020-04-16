const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyparser = require('body-parser');
const mysqlConnection = require('./connection');
const Description = require('./AppRoute/description');
const port = 3000;
var app = express();

app.use(bodyparser.json());

app.use('/description',Description);

//Without HTTPS
//app.listen(port);

// WITH HTTPS
https.createServer({
    key: fs.readFileSync('./devserver.key'),
    cert: fs.readFileSync('./devserver.cert')
},app).listen(port,()=>{
    console.log('Listening https on Port ' + port);
});