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
        .then(user => {
            return this.res.json({message: "Usuário cadastrado com sucesso"});
        })
        .catch((err) => {
            return this.res.json({message: "Erro ao salvar"})
        });
    }
    
    load(){
        models.User.findAll({})
        .then(users => {
            return this.res.json(users);
        })
        .catch((error) => {
            return this.res.status(500).json(error)
        });
    }

    update(){

    }

    remove(){
        models.User.destroy({
            where: {
                id: this.req.params.id  
            }
        })
        .then((deletedRecord) => {
            if(deletedRecord === 1)
                return this.res.status(200).json({message:"Deleted successfully"});         
            else
                return this.res.status(404).json({message:"record not found"})
        })
        .catch((error) => {
           return this.res.status(500).json({message: error})
        })
    }
}