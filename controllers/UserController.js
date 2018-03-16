var jwt = require("jsonwebtoken");
var mysql = require('mysql')
var bcrypt = require('bcrypt-nodejs')
var models  = require('../models');

module.exports = class UserController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    save(user){
        user.userName = user.email.split("@")[0];
        models.User.create(user)    
        .then(res => {
            return this.res.json({status: 201})
        })
        .catch((err) => {
            return this.res.status(500).json({message: err});
        });
    }
    
    load(){ 
        models.User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(users => {
            return this.res.json(users);
        })
        .catch((error) => {
            return this.res.status(500);
        });
    }

    remove(){
        models.User.destroy({
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