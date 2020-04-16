const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass4Labo',
    database: 'PXS',
    port : 3306,
    multipleStatements : true
});

mysqlConnection.connect(function(err) {
    if (err) { 
        console.log('error while connecting to DB !!!');
        console.log(err.code);
        throw(err);
    }
    else{
        console.log('DB Connected !!!');
    }
});

module.exports = mysqlConnection;
