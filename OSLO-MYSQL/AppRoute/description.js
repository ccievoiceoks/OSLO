const express = require('express');
const mysqlConnection = require('../connection');

const Router = express.Router();

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

Router.get('/category/', (req, res)=>{
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

Router.get('/category/:CATEGORY', (req, res)=>{
    var CAT = '%' + [req.params.CATEGORY] + '%';
     mysqlConnection.query("SELECT * FROM info where category like ?",[CAT], (err, rows, fields) => {
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

Router.get('/complete/:CATEGORY', (req, res)=>{
    var CAT = '%' + [req.params.CATEGORY] + '%';
    mysqlConnection.query("SELECT * FROM info where category like ? or description like ?",[CAT,CAT], (err, rows, fields) => {
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

module.exports = Router;
