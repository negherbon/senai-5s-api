var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var path = require('path')
var app = express()
const mysql = require('mysql')
const main = require('./routes/main')
var jwt = require('express-jwt')
const users = require('./routes/user-routes')
const units = require('./routes/unit-routes')
const enviromentTypes = require('./routes/enviroment-types-routes')
const enviroments = require('./routes/enviroment-routes')
const questions = require('./routes/question-routes')

process.env.SECRET_KEY = "projeto@senai_5s@";

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/views'));
app.use(jwt({ secret: process.env.SECRET_KEY}).unless({path: ['/authenticate']}));

/*  rotas  */
app.post('/authenticate', users);
app.get('/main', main);

app.post('/users', users);
app.get('/users', users);
app.delete('/users/:id', users);
app.put('/users/:id', users);

app.post('/units', units);
app.get('/units', units);
app.delete('/units/:id', units);
app.put('/units/:id', units);

app.post('/enviromenttypes',enviromentTypes);
app.get('/enviromenttypes', enviromentTypes);
app.delete('/enviromenttypes/:id', enviromentTypes);
app.put('/enviromenttypes/:id', enviromentTypes);

app.post('/enviroments', enviroments);
app.get('/enviroments', enviroments);
app.delete('/enviroments/:id', enviroments);
app.put('/enviroments/:id', enviroments);

app.post('/questions', questions);
app.get('/questions', questions);
app.delete('/questions/:id', questions);
app.put('/questions/:id', questions);


app.listen(4000, function(){
    console.log("server is up");
})  