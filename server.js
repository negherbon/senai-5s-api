var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var app = express();
const mysql = require('mysql');
const users = require('./routes/user-routes')
const main = require('./routes/main')

process.env.SECRET_KEY = "mybadasskey";

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/views'));

/*  rotas  */
app.post('/authenticate', users);
app.get('/main', main);
app.post('/users', users);
app.get('/users', users);

app.listen(4000, function(){
    console.log("server is up");
})  
