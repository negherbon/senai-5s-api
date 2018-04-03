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
        },
        description: {
            type: DataTypes.STRING
        }		
    },  
    {
        classMethods: {
            associate : function(models) {
            },
        },
        tableName: 'enviroments' 
    });

    Enviroment.associate = (models) => {
        Enviroment.belongsTo(models.User, { foreignKey: 'users_id'});
        Enviroment.belongsTo(models.Unit, { foreignKey: 'units_id'});
        Enviroment.belongsTo(models.EnviromentType, { foreignKey: 'enviroment_types_id'});
        Enviroment.belongsToMany(models.Question, {
            through: 'enviroments_has_questions',
            as: 'enviroments',
            foreignKey: 'enviroments_id'
        });
    };

    return Enviroment;
  };