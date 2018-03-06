var models  = require('../models');

module.exports = class UserController {
    save(user){
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
    load(req, res){
        const data = models.User.findAll()
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(function(err){
            console.log('err' + err);
        })
    }
}