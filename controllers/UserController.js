var models  = require('../models');

module.exports = class UserController {
    async save(){
        var user = {
            name: 'teste',
            email: 'nassguilherme@gmail.com',
            userName: 'nass',
            profile: 'admin',
            password: '123456'
        };
        
        models.User.create(user)
            .then(function () {
                console.log('ok')
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}