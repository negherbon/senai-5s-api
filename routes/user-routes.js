var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');

router.post('/authenticate', function(req, res) {
    new authController(req, res).authenticate();
});

router.post('/users', function(req, res) {
    new userController(req, res).save();
});

module.exports = router;