var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var app = express();
const mysql = require('mysql');
const UserController = require('./controllers/UserController')
const users = require('./routes/user-routes')
const main = require('./routes/main')

process.env.SECRET_KEY = "mybadasskey";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/views'));

/*  rotas  */
app.post('/authenticate', users);
app.get('/main', main);


function isAuthenticate(){
  console.log('caiu aqui no auth')
  return false;
}

app.listen(4000, function(){
    console.log("server is up");
})  
