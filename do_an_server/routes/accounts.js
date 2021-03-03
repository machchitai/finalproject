var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var authenticate = require('../middleware/auth');
var md5 = require('md5');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'fashionstore'
});

/* GET users listing. */
router.get('/', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM accounts', function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });

});

/* POST add many users. */
router.post('/', authenticate.auth,function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`INSERT INTO  accounts (name, username, password, email, role, customerid, create_date, update_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
        , 
        []
        , function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
            
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });

});

module.exports = router;
