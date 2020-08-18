var express =require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fetch = require('isomorphic-fetch');

var app = express();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// router.get('/', function(req, res, next){
//     console.log(req.body);
//     res.render("clothes",
//     {
//         title: 'cofortable colthes',
//         temperature: req.body.temperature,
//     });
// });

module.exports = router;