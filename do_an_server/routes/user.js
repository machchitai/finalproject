var express = require('express');
var router = express.Router();
var fs = require('fs');
var authenticate = require('../middleware/auth');
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
    database        : 'shop_ban_hang'
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { UpgradeRequired } = require('http-errors');

// Connection URL
const url = 'mongodb://localhost:27017';

const dbName = 'shop_online';

router.get('/', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        if(err)
            console.log(err);

        const db = client.db(dbName);

        const collection_user = db.collection('users');

        collection_user.find({}).toArray(function(err, ds_user) {
            if(err)
                console.log(err);

            //console.log(ds_user);

            res.json({'xu_ly': 'thông tin user', 'data': ds_user});
            
            client.close();
        });
    });
});

router.get('/:id_user', (req, res) => {

    MongoClient.connect(url, function(err, client) {
        if(err)
            console.log(err);
        const db = client.db(dbName);
        const collection_user = db.collection('users');
        //collection_user.findOne({'eidil': req.params.id_user},function(err, info_user) {
        collection_user.findOne({'_id': ObjectID(req.params.id_user)},function(err, info_user) {
            if(err)
                console.log(err);
            //console.log(ds_user);
            res.json({'xu_ly': 'thông tin user', 'data': info_user});
            client.close();
        });
    });
    //res.json({'xu_ly': 'thông tin user ' + req.params.id_user});
});

router.post('/', authenticate.auth, (req, res) => {
    //console.log(hahaha.length);
    res.json({
        'xu_ly': 'thêm user mới',
        data_send: req.body
    });
});

router.post('/sign-up', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        var data_save = req.body;
        var created_date = new Date().toISOString();
        data_save.created_date = created_date;
        data_save.updated_date = created_date;
        data_save.idt_khau = md5(data_save.idt_khau);

        if(err)
            console.log(err);
        const db = client.db(dbName);
        const collection_user = db.collection('users');
        collection_user.insertOne(data_save, () => {
            res.json({
                'xu_ly': 'đăng ký user mới',
                data_send: data_save
            });
        })
    });
});

router.put('/:id_user', (req, res) => {
    //console.log(req.params.eidil);
    //console.log(req.body);
    MongoClient.connect(url, function(err, client) {
        if(err)
            console.log(err);
        const db = client.db(dbName);
        const collection_user = db.collection('users');
        delete req.body._id;

        collection_user.findOne({_id: ObjectID(req.params.id_user)}, function(err, info_user){
            if(err)
                console.log(err);
            var data_save = req.body;
            if(req.body.idt_khau == info_user.idt_khau){
                data_save.idt_khau = info_user.idt_khau;
            }
            else {
                data_save.idt_khau = md5(req.body.idt_khau);
            }
            var updated_date = new Date().toISOString();
            data_save.updated_date = updated_date;
            //collection_user.updateOne({eidil: req.params.eidil}, { $set: req.body }, () => {
            collection_user.updateOne({_id: ObjectID(req.params.id_user)}, { $set: data_save }, () => {
                res.json({
                    'xu_ly': 'update user ' + req.params.id_user + ' thành công',
                    data_send: req.body
                });
            });
        });
    });
});


//router.delete('/:eidil', authenticate.auth, (req, res) => {
router.delete('/:id_user', authenticate.auth, (req, res) => {
    console.log(req.params.eidil);
    MongoClient.connect(url, function(err, client) {
        if(err)
            console.log(err);
        const db = client.db(dbName);
        const collection_user = db.collection('users');
        collection_user.deleteOne({_id: ObjectID(req.params.id_user)}, () => {
            res.json({
                'xu_ly': 'delete user ' + req.params.eidil + ' thành công',
                data_send: req.body
            });
        });
        
    });
})


// router.post('/log-in', (req, res) => {
//     console.log(req.body);
//     MongoClient.connect(url, function(err, client) {
//         if(err)
//             console.log(err);
//         const db = client.db(dbName);
//         const collection_user = db.collection('users');
//         collection_user.findOne({tai_khoan: req.body.tai_khoan}, (err, result) => {
//             if(err)
//                 console.log(err);

//             if(typeof result != 'undefined' && result != null){
//                 if(result.idt_khau == md5(req.body.idt_khau)){
//                     //res.status(401);
//                     result.idt_khau = null;
//                     res.json({
//                         'xu_ly': 'đăng nhập thành công',
//                         data_send: result
//                     });
//                 }
//                 else{
//                     res.status(401);
//                     res.json({
//                         'xu_ly': 'xử lý đăng nhập thất bại, sai tài khoản hoặc mật khẩu',
//                         error: true
//                     });
//                 }
//             }
//             else{
//                 res.status(401);
//                 res.json({
//                     'xu_ly': 'xử lý đăng nhập thất bại, sai tài khoản hoặc mật khẩu',
//                     error: true
//                 });
//             }
//         });
        
//     });
// })


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
        connection.query(`SELECT * FROM users WHERE username = ? OR eidil = ?`, [req.body.ten_dang_nhap, req.body.ten_dang_nhap], function (error, results, fields) {
          // Handle error after the release.
          if (error) throw error;

          var string_token = '';
          if(results.length && results[0]){
            if(results[0].idt_khau == md5(req.body.idt_khau)){

                connection.query(`SELECT * FROM token WHERE user_id = ?`, [results[0].id], function (error, results_token, fields){
                    if (error) throw error;

                    string_token = base64.encode(results[0].eidil + results[0].ten_dang_nhap + uuidv4());
                    console.log(string_token);
                    created_date = (new Date().toISOString().split('.'))[0].replace(/T/, ' ');
                    expired_date = (new Date(new Date().getTime()+(30*24*60*60*1000)).toISOString().split('.'))[0].replace(/T/, ' ');

                    if(results_token.length){//nếu có token rồi
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
                    else {//chưa có token

                        connection.query(`INSERT INTO token(token, type_token, user_id, created_date, expired_date)
                                            VALUES(?, ?, ?, ?, ?)`, 
                        [string_token, created_date, expired_date, results[0].id, 'authorized'], 
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
            else{//sai mật khẩu
                var error = {
                    error: true,
                    message: "Wrong username or password"
                }
                res.json(error);
            }
          }
          else {//tài khoản không tồn tại
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
    
            connection.query(`SELECT mqt.*
            FROM token t
            JOIN nguoi_dung nd
            ON nd.id = t.user_id
            JOIN bang_phan_quyen bpq
            ON nd.id_quyen = bpq.id_quyen_nguoi_dung
            JOIN menu_quan_tri mqt
            ON bpq.id_menu_quan_tri = mqt.id
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