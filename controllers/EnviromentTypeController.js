var models = require('../models');

module.exports = class EnviromentTypeController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(enviromentType){
        models.EnviromentType.create(enviromentType)    
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {   
            return this.res.status(500).json({message: err});
        });
    }

    load(){ 
        models.EnviromentType.findAll({})
        .then(enviromentTypes => {
            return this.res.json(enviromentTypes);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    update(enviromentType){
        return models.EnviromentType.update(enviromentType,
        { 
            where: { id: enviromentType.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove(){
        models.EnviromentType.destroy({
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