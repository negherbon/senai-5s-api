var express = require('express');
var router = express.Router();
var questionController = require('../controllers/QuestionController')

router.post('/questions', function(req, res) {
    new questionController(req, res).save(req.body);
});

router.post('/associate', function(req, res){
    new questionController(req, res).saveInAssociateTable(req.body);
})

router.get('/associate/:id', function(req, res){
    new questionController(req, res).getRelatedItems(req.params);
})

router.put('/questions/:id', function(req, res){
    new questionController(req, res).update(req.body);
})

router.get('/questions', function(req, res){
    new questionController(req, res).load();
})      

router.delete('/questions/:id', function(req, res){
    new questionController(req, res).remove();
})

module.exports = router;