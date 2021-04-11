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

/* GET users listing. */
router.get('/', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        
        // Use the connection
        connection.query('SELECT * FROM users', function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });

    
});


router.post('/admin-log-in', (req, res) => {
    var keys = ['keyboard cat'];

    var cookies = new Cookies(req, res, { keys: keys });

    var lastVisit = cookies.get('LastVisit', { signed: true })

    cookies.set('LastVisit', (new Date(new Date().getTime()+(30*24*60*60*1000))).toISOString(), { signed: true });

    console.log(req.body);

    if (!lastVisit) {
       // console.log('');
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

        pool.getConnection(function(err, connection) {
            if (err) throw err;
    
            connection.query(`SELECT mad.*
            FROM token t
            JOIN users u
            ON u.id = t.user_id
            JOIN role_distribution_table rdt
            ON u.id_role = rdt.id_roles
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
            error: true,
            message:"You are not authorized!",
            permission: []
        });
    }
});

router.post('/sign-up', (req, res) => {
    // console.log(req.body);
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [req.body.username,req.body.email], function (error, results, fields) {
          // Handle error after the release.
            if (error) throw error;

            if(results.length && results[0]){       
                var error = {
                    error: true,
                    message: "Username already exists!"
                }
                res.json(error);                
            }

            else { 

                let date_ob = new Date();
                // current date
                let date = ("0" + date_ob.getDate()).slice(-2);
                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);                
                // current year
                let year = date_ob.getFullYear();                
                // current hours
                let hours = date_ob.getHours();                
                // current minutes
                let minutes = date_ob.getMinutes();                
                // current seconds
                let seconds = date_ob.getSeconds();                
                created_date = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

                connection.query(`INSERT INTO users(id_role, name, username, password, email, create_date)
                                    VALUES(?, ?, ?, ?, ?, ?)`, 
                [req.body.id_role, req.body.name, req.body.username, md5(req.body.password), req.body.email, created_date],
                function (error, results, fields){
                        if (error) {
                            var error = {
                                error: true,
                                message: "create user failed"
                            }
                            res.json(error);
                        }
                        else {
                            var response = {
                                error: false,
                                message: "create user successful"
                            }
                            res.json(response);
                        }
                        connection.release();
                }); 
            }
        });
               
    });
});

/* GET users listing. */
router.get('/:id_user', function(req, res, next) {


    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM users WHERE id = '${req.params.id_user}'`, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });
    
});

router.put('/:id', function(req, res, next) {

    console.log(req.body, req.params);
    //res.json({});

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM users`, function (error, results_user, fields) {
            if (error) throw error; // not connected!

            var update = results_user.filter(id_user => req.body.find(item_new_user => item_new_user.id === id_user.id));

            connection.query(`DELETE FROM users WHERE id = ?`, [req.params.id], function (error, result_delete, fields) {
                if (error) throw error; 

                let date_ob = new Date();
                // current date
                let date = ("0" + date_ob.getDate()).slice(-2);
                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);                
                // current year
                let year = date_ob.getFullYear();                
                // current hours
                let hours = date_ob.getHours();                
                // current minutes
                let minutes = date_ob.getMinutes();                
                // current seconds
                let seconds = date_ob.getSeconds();                
                created_date = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

                for(let i = 0; i < update.length; i++){
                    
                    connection.query(`INSERT INTO users (id, id_role, name, username, password, email, create_date) VALUES(?, ?, ?, ?, ?, ?)`, 
                    [update[i].id, req.body.id_role, req.body.name, req.body.username, md5(req.body.password), req.body.email, created_date], 
                    function(error, result_insert, fields){
                        if (error) throw error; 

                        console.log(i);
                        if(i == update.length - 1){
                            
                            res.json(
                                {
                                    error: false,
                                    message: "Update successful"
                                }
                            );
                            connection.release();
                        }
                    })
                }
                
            });
        });

    });
    
});

router.delete('/:id_user', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`DELETE FROM users WHERE id = '${req.params.id_user}'`, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });
    
});

router.delete('/', function(req, res, next) {

    //console.log(req.body);
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        
        connection.query('DELETE FROM users WHERE (id, id) IN (?)', [selectedIds], function (error, results, fields) {
            if (error) throw error; 
            console.log(results)
            res.json(results);
        });
    });
});

module.exports = router;