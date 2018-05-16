module.exports = (sequelize, DataTypes) => {  
    
    var EnviromentType = sequelize.define('EnviromentType', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {
        classMethods: {
            associate : function(models) { },
        },

        tableName: 'enviroment_types' 
    });


    return EnviromentType;
};