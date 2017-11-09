var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController')

router.post('/authenticate', function(req, res) {
    new userController(req, res).authenticate();
});

module.exports = router;