
var express = require('express');
var app = express(); 

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass4Labo',
    database: 'PXS',
    port : 3306
});
connection.connect(function(err) {
  if (err) { 
    console.log('error while  connecting');
    console.log(err.code);
    throw(err);
  }
  else
  {
    console.log('Connected !!!');
    /*connection.query("SELECT * FROM info", function (err, result, fields) {
      if (err) { 
        console.log('Error executing Query');
        console.log(err.code);
        console.log(err.log);
        throw err;
      }
      else{
        console.log(result[0].description);
      }
      connection.end();
      });*/
  }
});
  // END HERE
  /* var CAT = '%Forum%';

  connection.query("SELECT * FROM info where category like ?",[CAT], function (err, result, fields) {
  if (err) { 
    console.log('Error executing Query');
    console.log(err.code);
    console.log(err.log);
    throw err;
  }
  else{
    console.log(result[0].description);
  }
  connection.end();
  });
});
*/ 
// CLOSE END HERE

app.get('/',function(req,resp){
  var CAT = '%Cisco%';

  connection.query("SELECT * FROM info where category like ?",[CAT], function (err, result, fields) {
  if (err) { 
    console.log('Error executing Query');
    console.log(err.code);
    console.log(err.log);
    //throw err;
  }
  else{
    console.log(result.json);
    resp.send('Here is the output --> \n' + result[0].description + '\n Second Value --> ' + result[1].description);
  }

});
});

app.listen(1337);