module.exports = (sequelize, DataTypes) => {  
    const Enviroment = sequelize.define('Enviroment', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        units_id: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        },
        enviroment_types_id: {
            type: DataTypes.INTEGER
        }		
    },  
    {
        classMethods: {
            associate : function(models) {
                Enviroment.belongsTo(models.User, { foreignKey: 'users_id'});
                Enviroment.belongsTo(models.Unit, { foreignKey: 'units_id'});
                Enviroment.belongsTo(models.EnviromentType, { foreignKey: 'enviroments_type_id'});
            },
        },
        tableName: 'enviroments' 
    });
    return Enviroment;
  };