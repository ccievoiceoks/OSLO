const express = require('express');
const bodyparser = require('body-parser');
const mysqlConnection = require('./connection');
const Description = require('./AppRoute/description');
var app = express();

app.use(bodyparser.json());

app.use('/Description',Description);



/*var CAT = 'Cisco';
connection.query("SELECT * FROM info where category like ?",[CAT], function (err, result, fields) {
    if (err) { 
        console.log('Error executing Query');
        console.log(err.code);
        console.log(err.log);
        throw err;
    }
    else{
        console.log('Result Array in function --> ' + Array.isArray(result))
        console.log('Type of --> ' + typeof(result));
        console.log(result);
    }
});
*/ 


app.listen(3000);