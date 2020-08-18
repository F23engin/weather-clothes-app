var express = require('express');
var router = express.Router();
var app = express();

app.use(express.static(__dirname));
app.use(express.static('public/images'));

var fs = require('fs');

router.get('/fstest', function(req, res, next){
    switch(request.url) {
        case '/fstest':
            fs.readFile('views/fstest.html', 'UTF-8',
                function (err, data) {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data);
                    response.end();
                }
            );
            break;
        case '/public/images/20.png':
            fs.readFile('public/images/20.png', 'binary',
                function (err, data) {
                    response.writeHead(200, {'Content-Type': 'image/png'});
                    response.write(data, 'binary');
                    response.end();
                }
            );
            break;
        }
});

// function doRequest(request, response) {
//     switch(request.url) {
//     case '/fstest':
//         fs.readFile('views/fstest.html', 'UTF-8',
//             function (err, data) {
//                 response.writeHead(200, {'Content-Type': 'text/html'});
//                 response.write(data);
//                 response.end();
//             }
//         );
//         break;
//     case '/public/images/20.png':
//         fs.readFile('public/images/20.png', 'binary',
//             function (err, data) {
//                 response.writeHead(200, {'Content-Type': 'image/png'});
//                 response.write(data, 'binary');
//                 response.end();
//             }
//         );
//         break;
//     }
// };

module.exports = router;