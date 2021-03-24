var express = require('express');
var router = express.Router();
var fs = require('fs');
var authenticate = require('../middelware/auth');
var md5 = require('md5');
var mysql = require('mysql');

const { v4: uuidv4 } = require('uuid');
var base64 = require('base-64');

var Cookies = require('cookies');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'fashionstore'
});

const { UpgradeRequired } = require('http-errors');


router.post('/admin-log-in', (req, res) => {
    var keys = ['keyboard cat'];

    var cookies = new Cookies(req, res, { keys: keys });

    var lastVisit = cookies.get('LastVisit', { signed: true })

    cookies.set('LastVisit', (new Date(new Date().getTime()+(30*24*60*60*1000))).toISOString(), { signed: true });

    console.log(req.body);

    if (!lastVisit) {
        console.log('nothing here');
    } else {
        console.log(lastVisit);
    }

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [req.body.username, req.body.email], function (error, results, fields) {
          // Handle error after the release.
          if (error) throw error;

          var string_token = '';
          if(results.length && results[0]){
            if(results[0].password == md5(req.body.password)){

                connection.query(`SELECT * FROM token WHERE user_id = ?`, [results[0].id], function (error, results_token, fields){
                    if (error) throw error;

                    string_token = base64.encode(results[0].email + results[0].username + uuidv4());
                    console.log(string_token);
                    created_date = (new Date().toISOString().split('.'))[0].replace(/T/, ' ');
                    expired_date = (new Date(new Date().getTime()+(30*24*60*60*1000)).toISOString().split('.'))[0].replace(/T/, ' ');

                    if(results_token.length){ // token exist
                        connection.query(`UPDATE token
                        SET token = ?,
                        expired_date = ?
                        WHERE user_id = ?`, 
                        [string_token, expired_date, results[0].id], 
                        function (error, results, fields){
                            if (error) throw error;

                            var response = {
                                error: false,
                                token: string_token,
                                message: "Login successful"
                            }
                            res.json(response);

                            connection.release();
                        });
                    }
                    else { // token not exist

                        connection.query(`INSERT INTO token(token, type_token, user_id, created_date, expired_date)
                                            VALUES(?, ?, ?, ?, ?)`, 
                        [string_token, 'authorized', results[0].id, created_date, expired_date ], 
                        function (error, results, fields){
                            if (error) throw error;

                            var response = {
                                error: false,
                                token: string_token,
                                message: "Login successful"
                            }
                            res.json(response);

                            connection.release();
                        });

                    }
                })

            }
            else { // wrong password
                var error = {
                    error: true,
                    message: "Wrong username or password"
                }
                res.json(error);
            }
          }
          else { // account not exist
            var error = {
                error: true,
                message: "Wrong username or password"
            }
            res.json(error);
          }

          
        });
    });
})


router.post('/admin-authorized', (req, res) => {
    var authorized = req.header('authorization');
    
    if(authorized){
        authorized = authorized.split(' ')[1];
        //console.log(authorized.split(' ')[1]);

        pool.getConnection(function(err, connection) {
            if (err) throw err;
    
            connection.query(`SELECT mad.*
            FROM token t
            JOIN users u
            ON u.id = t.user_id
            JOIN role_distribution_table rdt
            ON u.role = rdt.id_roles
            JOIN menu_admin mad
            ON rdt.id_menu_admin = mad.id
            WHERE t.token = ?`, 
            [authorized], 
            function (error, results_permission, fields){
                if (error) throw error;

                res.json({
                    error: false,
                    permission: results_permission
                });
                
            });
        });
    }
    else{
        res.json({
            error: false,
            permission: []
        });
    }
});

module.exports = router;