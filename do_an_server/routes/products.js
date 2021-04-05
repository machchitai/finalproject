var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'fashionstore'
});

/* GET products listing. */
router.get('/', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!        
       
        // Use the connection
        connection.query('SELECT * FROM product' , function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });

    
});

router.get('/:id_product', function(req, res, next) {


    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM product WHERE id = '${req.params.id_product}'`, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          res.json(results);
        });
    });
    
});

router.post('/add', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
    
    connection.query(`INSERT INTO product(categoryid, name, description, price, vendor, color, size, quantity)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
        [req.body.categoryid, req.body.name, req.body.description, req.body.price, req.body.vendor, req.body.color, req.body.size, req.body.quantity],
        function (error, results, fields){
            if (error) throw error;

            var response = {
                error: false,
                message: "create product successful"
            }
            res.json(response);

            connection.release();
        });
    });
});


module.exports = router;
