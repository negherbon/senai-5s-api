var express = require('express');
var router = express.Router();

router.get('/main', function(req, res) {
    console.log('caiu aq')
    var notifications = [
        'teste', 'teste2', 'teste3'
    ]
    res.json({notifications: notifications})
});

module.exports = router;