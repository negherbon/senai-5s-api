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
}