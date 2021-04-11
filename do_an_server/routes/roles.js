var express = require('express');
var router = express.Router();
var fs = require('fs');
// var authenticate = require('../middleware/auth');
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

/* GET users listing. */
router.get('/', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM roles`, function (error, results, fields) {
            if (err) throw err; // not connected!

            res.json(results);
        });

    });
    
});

router.get('/:id_role', function(req, res, next){
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT mad.* 
            FROM menu_admin mad
            JOIN role_distribution_table rdt
            ON mad.id = rdt.id_menu_admin
            WHERE rdt.id_roles = ?`, req.params.id_role, function (error, results, fields) {
            if (err) throw err; // not connected!

            res.json(results);
        });
    
    });
});

router.put('/:id_role', function(req, res, next) {

    console.log(req.body, req.params);
    //res.json({});

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM menu_admin`, function (error, results_menu_role, fields) {
            if (err) throw err; 
            
            var update = results_menu_role.filter(menu_role => req.body.find(item_new_role => item_new_role.alias === menu_role.alias));

            connection.query(`DELETE FROM role_distribution_table WHERE id_roles = ?`, [req.params.id_role], function (error, result_delete, fields) {
                if (err) throw err; 
                for(let i = 0; i < update.length; i++){
                    connection.query(`INSERT INTO role_distribution_table (id_roles, id_menu_admin) VALUES(?, ?)`, [req.params.id_role, update[i].id], function(error, result_insert, fields){
                        if (err) throw err;
                        console.log(i);
                        if(i == update.length - 1){
                            
                            res.json(
                                {
                                    error: false,
                                    message: "Set permission Complete"
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


module.exports = router;
