var express = require('express');
var router = express.Router();
// var passport

router.get('/', function(req, res, next) {
    res.render('signin', { 
        title: 'SIGN IN PAGE',
        h1: '毎日を快適に',
        formAction: 'signin',
        usernameValue: 'gest',
        passwordValue: '12345',
        submitValue: 'signin',
        aLink: 'register',
        a: '登録'
    })
});

// router.post('/',
//   passport.authenticate('local',
//   {
//     failureRedirect: '/signin'
//   }
//   ),
//   function(req, res, next){
//     fetch("http://localhost:3000/signin",
//     {
//       credentials: "include"
//     }
//     ).then(function(){
//       res.redirect("/userhome");
//     }).catch(function(e){
//       console.log(e);
//     });
//   }
// );

module.exports = router;