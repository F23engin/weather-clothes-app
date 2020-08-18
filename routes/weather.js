var express = require('express');
var router = express.Router();
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
        res.render("weather", {
            temp : data.main.temp
        });
    });
});

module.exports = router;