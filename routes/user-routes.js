var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');

router.post('/authenticate', function(req, res) {
    new authController(req, res).authenticate();
});

router.post('/users', function(req, res) {
    if(req.body)
        new userController(req, res).save(req.body);
});

router.get('/users', function(req, res){
    new userController(req, res).load();
    console.log('resposta' + JSON.parse(res));
})

module.exports = router;