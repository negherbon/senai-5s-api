var models = require('../models');

module.exports = class Question {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(question){
        models.Question.create(question)    
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {   
            return this.res.status(500).json({message: err});
        });
    }

    load(){ 
        models.Question.findAll({})
        .then(questions => {
            return this.res.json(questions);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    update(question){
        return models.Question.update(question,
        { 
            where: { id: question.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove(){
        models.Question.destroy({
            where: {    
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord === 1)
                return this.res.json({status: 200, message: "Removido com sucesso!"});         
            else
                return this.res.json({status: 404, message: "Registro não encontrado!"}); 
        })
        .catch((error) => {
            return this.res.json({status: 500, message: "Erro de servidor"}); 
        })
    }
}