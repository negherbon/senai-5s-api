var express = require('express');
var router = express.Router();
var authController = require('../controllers/AuthController')

router.post('/authenticate', function(req, res) {
    new AuthController(req, res).authenticate();
});

module.exports = router;