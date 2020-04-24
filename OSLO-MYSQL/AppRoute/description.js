const express = require('express');
const mysqlConnection = require('../connection');

//const path = require('path');

const Router = express.Router();

/*// Load View Engine
Router.set('views',path.join(__dirname,'../../Views'));
Router.set('view engine','pug');
*/
Router.get('/', (req, res)=>{
    mysqlConnection.query("SELECT * FROM info", (err, rows, fields) => {
        if (!err)
        {
            console.log(rows);
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

Router.get('/TEST/',(req,res) => {
    res.render('index');
});

Router.get('/category/', (req, res)=>{
    mysqlConnection.query("SELECT * FROM info", (err, rows, fields) => {
        if (!err)
        {
            console.log(rows);
            results = JSON.parse(JSON.stringify(rows));
            //res.send(rows);
            res.render('result_full',results);
        }
        else{
            console.log(err);
        }
    });
});

Router.get('/category/:CATEGORY', (req, res)=>{
    var CAT = '%' + [req.params.CATEGORY] + '%';
     mysqlConnection.query("SELECT * FROM info where category like ?",[CAT], (err, rows, fields) => {
         if (!err)
         {
            console.log(rows);
            results = JSON.parse(JSON.stringify(rows));
            //res.send(rows);
            res.render('result_full',results);
         }
         else{
             console.log(err);
         }
     });
 });

Router.get('/complete/:CATEGORY', (req, res)=>{
    var CAT = '%' + [req.params.CATEGORY] + '%';
    mysqlConnection.query("SELECT description FROM info where category like ? or description like ?",[CAT,CAT], (err, rows, fields) => {
        if (!err)
        {
            console.log(rows);
            //res.send(rows);
            results = JSON.parse(JSON.stringify(rows));
            res.render('result_description',results);
        }
        else{
            console.log(err);
        }
    });
});

module.exports = Router;
