  module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('User', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER
        },		
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.STRING
        },
    },  
    {
        //para não ficar com table name zuado no banco
        tableName: 'users' 
    });
    
    return User;
  };