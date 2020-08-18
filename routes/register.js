var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1225',
    database: 'weather'
  });

  router.get('/', function(req, res, next){
      res.render('signin',{
          title: 'register',
          h1: '新規登録',
          formAction: 'register',
          usernameValue: '',
          passwordValue: '',
          submitValue: '登録する',
          aLink: 'signin',
          a: 'ログイン'
      });
  });

//   router.post('/register', function(req, res, next){
//       var username = req.body.username;
//       var password = req.body.password;
//       console.log(username);
//       console.log(password);
//     //   var query = 'INSERT into usernamepassword (username, password) VALUES (username, password);';
//     //   connection.query(query, function(err, rows){
//     //     res.redirect('/');
//     //   });
//   });

  module.exports = router;