var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Promise = require('bluebird');

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

        var query_limit = req.query.limit;

        if(query_limit){
            query_limit = ' LIMIT ' + query_limit;
        }
        else {
            query_limit = ''
        }
       
        // Use the connection
        connection.query('SELECT * FROM product ORDER BY id DESC' + query_limit, function (error, results, fields) {
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

        let update_date = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    
        connection.query(`INSERT INTO product(categoryid, name, description, price, vendor, color, related_color,  size, quantity, update_date)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [req.body.categoryid, req.body.name, req.body.description, req.body.price, req.body.vendor, req.body.color,  req.body.related_color, req.body.size, req.body.quantity, update_date],
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

router.get('/search/:search_array', function(req, res, next){
    pool.getConnection(function(err, connection) {
        connection.query(`SELECT *
        FROM product
        WHERE name LIKE ?
        `,
            ['%' + req.params.search_array + '%'],
            function(err, result, fields){
                if(err){
                    console.log(err);
                    throw err;
                }
                res.json(result);
                connection.release();
            }
        )
    });
});

router.delete('/:id_product', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`DELETE FROM product WHERE id = '${req.params.id_product}'`, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
          var response = {
                error: false,
                message: "delete product successful"
            }
          res.json(response);
        });
    });
    
});

router.put('/:id_product', function(req, res, next) {

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM product WHERE id = '${req.params.id_product}'`, function (error, results_product, fields) {
            if (error) throw error; // not connected!

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
            update_date = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

            connection.query(`UPDATE product 
                SET categoryid = ?,
                name = ?,
                description = ?,
                price = ?,
                vendor = ? ,
                color = ? ,
                related_color = ?,
                size = ?,
                quantity = ?,
                update_date = ? 
                WHERE id = ?
            `, [req.body.categoryid, req.body.name, req.body.description, req.body.price, req.body.vendor, req.body.color, req.body.related_color, req.body.size, req.body.quantity, update_date, req.params.id_product], 
                function (error, result_delete, fields) {
                if (error) throw error;                           
                            
                res.json(
                    {
                        error: false,
                        message: "Update successful"
                    }
                );
                connection.release();
            
            });
        });

    });
    
});


module.exports = router;
