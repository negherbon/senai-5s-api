var models = require('../models');

module.exports = class Question {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(question){
        models.Question.create(question)
        .then(res => {
            return this.res.json({status: 201, questionId: res.id, enviromentTypesId: question.enviroment_types_id})
        })
        .catch((err) => {   
            return this.res.status(500);       
        });
    }

    saveInAssociateTable(relatedIds){
        relatedIds.enviroments.forEach(enviromentId => {
            var items = {questions_id: relatedIds.questionId, enviroment_types_id: enviromentId};
            models.EnviromentTypeQuestion.create(items)
            .then(res => {  
                return this.res.status(200);
            })
            .catch((err) => {
                console.log(err);
            })
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
            console.log('res' + res);
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