var jwt = require("jsonwebtoken");
var mysql = require('mysql')
var bcrypt = require('bcrypt-nodejs')
var models  = require('../models');

module.exports = class UserController {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    async save(user){
        console.log('save' + user)
        user.userName = user.email.split("@")[0];
        models.User.create(user)
        .then(function () {
            console.log('ok')
        })
        .catch(function (err) {
            console.log(err);
        });
    }
    async load(){
        try {
            const data = await models.User.findAll()
            return this.res.json(data);
        }
        catch(err){
            console.log('err' + err);
        }
    }
}