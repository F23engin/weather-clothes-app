var express = require('express');
var router = express.Router();
var passport = require('passport');

var async = require('async');
var http = require('http');

router.post('/', function(req, res){
    console.log(req.body.city);
    switch ( req.body.city ) {
        case 'Hokkaido':
            var spot = 'Hokkaido';
            break;
        case 'Aomori':
            var spot = 'Aomori';
            break;
        case 'Iwate':
            var spot = 'Iwate';
            break;
        case 'Miyagi':
            var spot = 'Miyagi';
            break;
        case 'Akita':
            var spot = 'Akita';
            break;
        case 'Yamagata':
            var spot = 'Yamagata';
            break;
        case 'Fukushima':
            var spot = 'Fukushima';
            break;
        case 'Tokyo':
            var spot = 'Tokyo';
            break;
        case 'Kanagawa':
            var spot = 'Kanagawa';
            break;
        case 'Chiba':
            var spot = 'Chiba';
            break;
        case 'Saitama':
            var spot = 'Saitama';
            break;
        case 'Ibaraki':
            var spot = 'Ibaraki';
            break;
        case 'Tochigi':
            var spot = 'Tochigi';
            break;
        case 'Gunma':
            var spot = 'Gunma';
            break;
        case 'Yamanashi':
            var spot = 'Yamanashi';
            break;
        case 'Niigata':
            var spot = 'Niigata';
            break;
        case 'Nagano':
            var spot = 'Nagano';
            break;
        case 'Aichi':
            var spot = 'Aichi';
            break;
        case 'Gifu':
            var spot = 'Gifu';
            break;
        case 'Shizuoka':
            var spot = 'Shizuoka';
            break;
        case 'Mie':
            var spot = 'Mie';
            break;
        case 'Toyama':
            var spot = 'Toyama';
            break;
        case 'Ishikawa':
            var spot = 'Ishikawa';
            break;
        case 'Fukui':
            var spot = 'Fukui';
            break;
        case 'Osaka':
            var spot = 'Osaka';
            break;
        case 'Hyogo':
            var spot = 'Hyogo';
            break;
        case 'Kyoto':
            var spot = 'Kyoto';
            break;
        case 'Shiga':
            var spot = 'Shiga';
            break;
        case 'Nara':
            var spot = 'Nara';
            break;
        case 'Wakayama':
            var spot = 'Wakayama';
            break;
        case 'Shimane':
            var spot = 'Shimane';
            break;
        case 'Tottori':
            var spot = 'Tottori';
            break;
        case 'Okayama':
            var spot = 'Okayama';
            break;
        case 'Hirosima':
            var spot = 'Hirosima';
            break;
        case 'Yamaguchi':
            var spot = 'Yamaguchi';
            break;
        case 'Tokushima':
            var spot = 'Tokushima';
            break;
        case 'Kagawa':
            var spot = 'Kagawa';
            break;
        case 'Ehime':
            var spot = 'Ehime';
            break;
        case 'Kouchi':
            var spot = 'Kouchi';
            break;
        case 'Hukuoka':
            var spot = 'Hukuoka';
            break;
        case 'Saga':
            var spot = 'Saga';
            break;
        case 'Nagasaki':
            var spot = 'Nagasaki';
            break;
        case 'Kumamoto':
            var spot = 'Kumamoto';
            break;
        case 'Oita':
            var spot = 'Oita';
            break;
        case 'Miyazaki':
            var spot = 'Miyazaki';
            break;
        case 'Kagoshima':
            var spot = 'Kagoshima';
            break;
        case 'Okinawa':
            var spot = 'Okinawa';
            break;
        default:
            var spot = 'Not Found'
            break;
    };
    async.waterfall([
        function(next){
            var urlFront = "http://api.openweathermap.org/data/2.5/weather?q=";
            var urlBack = ",jp&units=metric&lang=ja&APPID=4df3b1736c20f28949a9c7a98ca12acb";
            var URL = urlFront + spot + urlBack ;
            console.log(URL)
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
            spot: spot
        });
    });
});

module.exports = router;