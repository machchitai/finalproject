var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'fashionstore'
});


var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'machchitai@gmail.com',
      pass: 'Machchitai17594'
    }
}));


router.post('/', function(req, res, next) {

    console.log(req.body);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        var date_ob = new Date();

        var date = ("0" + date_ob.getDate()).slice(-2);

        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        var year = date_ob.getFullYear();

        var total = 0;

        req.body.detail_orders.forEach(item_cart => {
            sum += item_cart.price
        });
       
        // Use the connection
        connection.query(`INSERT INTO orders (id, full_name, email, address, phone, created_date, status, note, sum, receiver_full_name, receiver_address, receiver_phone)
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
            , [
                req.body.full_name,
                req.body.email,
                req.body.receiver_address,
                req.body.receiver_phone,
                req.body.created_date = year + "-" + month + "-" + date,
                1,
                '',
                sum,
                req.body.full_name,
                req.body.receiver_address,
                req.body.receiver_phone,
            ]
            , function (error, results, fields) {       
                // Handle error after the release.
                if (error) throw error;
            
                if(results.insertId){

                    var html_string = '';
                    
                    req.body.detail_orders.forEach((item_cart, index) => {

                        html_string += `
                            <div>
                                ${item_cart.product_id},
                                ${item_cart.product_name},
                                ${item_cart.quantity},
                                ${item_cart.price},
                                ${item_cart.total}
                            </div>
                        `

                        connection.query(
                            `INSERT INTO detail_orders (id, orders_id, product_id, product_name, quantity, price, total) 
                            VALUES (NULL, ?, ?, ?, ?, ?, ?);`,
                            [
                                results.insertId,
                                item_cart.product_id,
                                item_cart.product_name,
                                item_cart.quantity,
                                item_cart.price,
                                item_cart.total
                            ],
                            function (err_child, results_child, fields) {
                                if (err_child){
                                    res.json({
                                        error: true,
                                        error_message: "Add orders failed!"
                                    });

                                    throw err_child;
                                }

                                if(index == req.body.detail_orders.length - 1){

                                    var id_export_order = String(results.insertId);

                                    connection.query('UPDATE orders SET id_export_order = ? WHERE id = ?',
                                        [
                                            id_export_order,
                                            results.insertId
                                        ],
                                        function(err_update, results_update, fields){
                                            if (err_update){
                                                res.json({
                                                    error: true,
                                                    error_message: "Create ID Export failed"
                                                });
            
                                                throw err_child;
                                            }

                                            html_string += `
                                                <div>Bạn mua đơn hàng: <a href="http://localhost:3000/orders/${id_export_order}">${id_export_order}</a></div>
                                            `

                                            var mailOptions = {
                                                from: 'machchitai@gmail.com',
                                                to: req.body.email,
                                                subject: 'Cám ơn bạn đã đặt hàng tại Shop Online',
                                                //text: html_string
                                                html: html_string
                                            };

                                            transporter.sendmail(mailOptions, function(error, info){
                                                if (error) {
                                                  console.log(error);
                                                } else {
                                                  console.log('Email sent: ' + info.response);
                                                }
                                            }); 

                                            console.log(html_string);
        
                                            connection.release();
        
                                            res.json(results);
                                        }
                                    )

                                }
                            }
                        )
                        
                    });

                }
                //res.json(results);
            }
        );
    });

    //res.json([]);
    
});


router.get('/:id_export_order', function(req, res, next){
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM orders WHERE id_export_order = ?',
            [req.params.id_export_order],
            function(err, result, fields){
                if(err){
                    console.log(err);
                    throw err;
                }

                res.json(result);
            }
        )
    });
    
});

router.get('/search/:search_array', function(req, res, next){
    pool.getConnection(function(err, connection) {
        connection.query(`SELECT o.*, product_name, price, quantity, total
        FROM orders o
        JOIN detail_orders d
        ON o.id = d.orders_id
        WHERE id_export_order LIKE ?`,
            ['%' + req.params.search_array + '%'],
            function(err, result, fields){
                if(err){
                    console.log(err);
                    throw err;
                }

                var array_result = [];

                result.forEach((item, index) => {
                    if (array_result[item.id]) {
                        var product_info = {
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.price,
                            total: item.total
                        };

                        array_result[item.id].product_list.push(product_info);
                    }

                    else {
                        var product_info = {
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.price,
                            total: item.total
                        };

                        item.product_list = [
                            product_info
                        ];
                        array_result[item.id] = item;
                    }
                });

                res.json(array_result.filter(item => item));
            }
        )
    });
});
module.exports = router;
