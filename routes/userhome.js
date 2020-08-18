var express = require('express');
var router = express.Router();
var passport = require('passport');

var async = require('async');
var http = require('http');

router.get('/', function(req, res){
    async.waterfall([
        function(next){
            var URL = "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=metric&lang=ja&APPID=4df3b1736c20f28949a9c7a98ca12acb";
            http.get(URL, function(res){
                var body = '';
                res.setEncoding('utf8');
                res.on('data', function(chunk){
                body += chunk;
                });
                res.on('data', function(chunk){
                    data = JSON.parse(body);
                    console.log('parse');
                    next(null, data);
                });
            }).on('error', function(e){
                console.log(e.message);
            });
        }
    ], function complete(err, data){
        console.log(data);
        switch( data.weather[0].main ) {
            case 'Thunderstorm':
                var weatherMain = 'Thunderstorm';
                var mainColor = '215, 210, 61';
                break;
            case 'Drizzle':
                var weatherMain = 'Drizzle';
                var mainColor = '194, 67, 32';
                break;
            case 'Rain':
                var weatherMain = 'Rain';
                var mainColor = '232, 158, 29';
                break;
            case 'Snow':
                var weatherMain = 'Snow';
                var mainColor = '31, 161, 216';
                break;
            case 'Clear':
                var weatherMain = 'Clear';
                var mainColor = '244, 103, 28';
                break;
            case 'Clouds':
                var weatherMain = 'Clouds';
                var mainColor = '0, 0, 0';
                break;
            default:
                var weatherMain = 'Atmosphere';
                var mainColor = '63, 228, 41';
                break;
        }
        console.log(weatherMain);
        console.log(mainColor);
        console.log(req.user);
        username = req.user.name;
        console.log(username);
        res.render("userhome", {
            title: 'userhome',
            weatherMain: weatherMain,
            mainColor: mainColor,
            username: req.user.name,
            weather: data.weather[0].description,
            temp: data.main.temp,
            feels: data.main.feels_like,
            max: data.main.temp_max,
            min: data.main.temp_min,
            spot: 'Tokyo'
        });
    });
});

module.exports = router;