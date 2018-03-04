var models  = require('../models');

module.exports = class UserController {
     save(user){
        console.log('esse user vem undefined' + user)
        user.userName = user.email.split("@")[0];
        models.User.create(user)
        .then(function () {
            console.log('ok')
        })
        .catch(function (err) {
            console.log(err);
        });
    }
}