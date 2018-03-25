var models = require('../models');

module.exports = class UnitController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(unit){
        models.Unit.create(unit)    
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {   
            return this.res.status(500).json({message: err});
        });
    }

    load(){ 
        models.Unit.findAll({})
        .then(units => {
            return this.res.json(units);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    update(unit){
        return models.Unit.update(unit,
        { 
            where: { id: unit.id }
        })
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }

    remove(){
        models.Unit.destroy({
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