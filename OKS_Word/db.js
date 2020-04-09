/*var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass4Labo",
    database: 'PXS'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
*/

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
  var CAT = '%Forum%';

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

/*
var mysql2 = require('mysql');
var pool  = mysql2.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'proximus',
  password        : 'C!sc0LAB',
  database        : 'uco_access'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});*/

/*

var db_config = {
  host: 'localhost',
    user: 'proximus',
    password: 'C!sc0LAB',
    database: 'uco_access'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
*/