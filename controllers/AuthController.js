var jwt = require("jsonwebtoken");
var mysql = require('mysql')
var bcrypt = require('bcrypt');
var models  = require('../models');

module.exports = class AuthController {
    constructor(req, res){
        this._req = req;
        this._res = res;
    }

    async authenticate(){
        var email = this._req.body.email;
        var password = this._req.body.password;

        try {
            const data = await models.User.findOne({
                where: {
                    email: email
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync(password, data.password);

                if(isAuthenticated){
                    var user = ({
                        id: data.id,
                        email: email,
                        userName: data.userName,
                        name: data.name,
                        profile: data.profile
                    })
                    var token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: '12h'
                    });
                    
                    this._res.json({
                        token: token,
                        isAuth: true
                    });
                    
                }else
                    this._res.status(401).send("Dados incorretos");
                
            } else 
                this._res.status(401).send("Usuário não encontrado");
			
        } catch(err) {
            this._res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }

    async validateFirstAccess(){
        var email = this._req.body.email;
        var cbFirstAccess = this._req.body.cbFirstAccess;
        console.log("emaaaill",email, cbFirstAccess);

        try {
            const data = await models.User.findOne({
                where: {
                    email: email
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync('newPasswordFirstAccess', data.password);

                if(isAuthenticated){
                    var user = ({
                        id: data.id,
                        email: email,
                        userName: data.userName,
                        name: data.name,
                        profile: data.profile
                    })
                    var token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: 400000
                    });
                    
                    this._res.json({
                        id: data.id,
                        isFirstAccess: true
                    });
                    
                }else
                    this._res.status(401).send("Usuario já realizou o primeiro acesso");
                
            } else 
                this._res.status(401).send("Usuário não encontrado");
			
        } catch(err) {
            this._res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }

    async firstAccess(){
        var id = this._req.body.id;
        var password = this._req.body.password;
    
        try {
            const data = await models.User.findOne({
                where: {
                    id: id
                }           
            });

            if(data){
               var isAuthenticated =  bcrypt.compareSync('newPasswordFirstAccess', data.password);
                password = this.generateHash(password);
     
                return models.User.update({password: password}, { where: { id: id }})
                .then(res => {
                    return this.res.status(200).json({
                        type: 'success', message: 'Senha cadastrada com sucesso'
                    })
                })
                .catch((error) => {
                    return this._res.status(500).json({
                        type: 'error', message: err, errorDetails: error
                    });
                });
            }else
                this._res.status(401).send("Usuario já realizou o primeiro acesso");
			
        } catch(err) {
            this._res.status(500).send("Ocorreu um erro ao tentar realizar o login" + err);
        }    
    }

    generateHash(password){
        var salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        return password;
    }
}