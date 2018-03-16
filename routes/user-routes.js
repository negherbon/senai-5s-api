var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');
var jwt = require('express-jwt');

router.post('/authenticate', function(req, res) {
    new authController(req, res).authenticate();
});

router.post('/users', function(req, res) {
    new userController(req, res).save(req.body);
});

router.get('/users', function(req, res){
    new userController(req, res).load();
})  

router.delete('/users/:id', function(req, res){
    new userController(req, res).remove();
})

module.exports = router;