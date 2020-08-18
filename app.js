var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql2');
var fetch = require('isomorphic-fetch');
var fs = require('fs');
var http = require('http');
var https = require('https');
var async = require('async');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var userhomeRouter = require('./routes/userhome');
var clothesRouter = require('./routes/clothes');
var fstestRouter = require('./routes/fstest');
var registerRouter = require('./routes/register');
var weatherRouter = require('./routes/weather');
var weatherSpotRouter = require('./routes/weatherSpot');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(express.static('images'));
app.use(express.static('public/images'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/userhome', userhomeRouter);
app.use('/clothes', clothesRouter);
app.use('/fstest', fstestRouter);
app.use('/register', registerRouter);
app.use('/weather', weatherRouter);
app.use('/weatherSpot', weatherSpotRouter);

//signin
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1225',
  database: 'weather'
})

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, done){
    connection.query("select * from usernamepassword;", function(err, users){
      var usernames = [];
      var passwords = [];
      for (i = 0; i < users.length; i++){
        usernames.push(users[i].username);
        var pw = users[i].password.toString();
        passwords.push(pw);
      }
      if (usernames.includes(username) && passwords.includes(password)){
        return done(null, username);
      }
      return done(null, false, {massage: "invalid"});
    });
  }
));

passport.serializeUser(function(username, done) {
  console.log('serializeUser');
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserializeUser');
  done(null, {name:username});
});

app.post('/signin',
  passport.authenticate('local',
  {
    failureRedirect: '/signin'
  }
  ),
  function(req, res, next){
    fetch("http://localhost:3000/signin",
    {
      credentials: "include"
    }
    ).then(function(){
      res.redirect("/userhome");
    }).catch(function(e){
      console.log(e);
    });
  }
);

//userhome
function isAuthenticated(req, res, next){
  if (req.isAuthenticated()){
      return next();
  } else {
      res.redirect('singin');
  }
};

app.post('/userhome', isAuthenticated, function(req, res, next){
  var temperature = req.body.temperature;
  var coldtempertuer = temperature - 1;
  var hottemperture = parseInt(temperature) + 1;
  var weatherMain = req.body.weatherMain;
  var mainColor = req.body.mainColor;
  res.render("clothes",
  {
      title: 'cofortable colthes',
      username: username,
      temperature: req.body.temperature,
      coldtempertuer: coldtempertuer,
      hottemperture: hottemperture,
      weatherMain: weatherMain,
      mainColor: mainColor
  });
  console.log(coldtempertuer);
  console.log(hottemperture);
  

  // res.setHeader('Content-Type', 'text/plain');
  // res.redirect("/clothes");
  // console.log(req.body.temperature);


  // fetch("http://localhost:3000/userhome").then(function(){
  //   res.redirect("/clothes");
  // }).catch(function(e){
  //   console.log(e);
  // });
  // console.log(req.body.temperature);
 });

 //register
 app.post('/register', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  var query = 'INSERT into usernamepassword set ?;';
  connection.connect();
  connection.query(query, { username:username, password:password }, function(err, rows){
    if(err) throw err;
    console.log('err...')
  });
  res.redirect('/signin');
  connection.end();
});

//signout
app.post('/signout', function(req, res, next){
  req.logout();
  res.redirect('/signin');
});

//fstest
// app.get('/fstest', function(req, res, next){
//   switch(req.url) {
//       case '/fstest':
//           fs.readFile('views/fstest.html', 'UTF-8',
//               function (err, data) {
//                   res.writeHead(200, {'Content-Type': 'text/html'});
//                   res.write(data);
//                   res.end();
//               }
//           );
//           break;
//       case '/public/images/20.png':
//           fs.readFile('public/images/20.png', 'binary',
//               function (err, data) {
//                   res.writeHead(200, {'Content-Type': 'image/png'});
//                   res.write(data, 'binary');
//                   res.end();
//               }
//           );
//           break;
//       }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
