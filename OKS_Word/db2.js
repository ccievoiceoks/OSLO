function DB(param){
    var CAT = '%'+ param +'%';
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
      //var CAT = '%Forum%';
    
      connection.query("SELECT * FROM info where category like ?",[CAT], function (err, result, fields) {
      if (err) { 
        console.log('Error executing Query');
        console.log(err.code);
        console.log(err.log);
        throw err;
      }
      else{
        //write('The DB has produced --> '+ result[0].description);
        console.log(result[0].description);
        //return result[0].description;
      }
      connection.end();
      });
    });
    }
    
   var Respons = DB('Fo');
    console.log(Respons);