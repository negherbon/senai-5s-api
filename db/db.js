module.exports.connection = function(){
    const Sequelize = require('sequelize')  
    var sequelize = new Sequelize('senai_5s', 'root', '',{
        host: 'localhost',    
        dialect: 'mysql',
        models: '/models/**/*.js',
        define: {
            timestamps: false
        }
    });
}
