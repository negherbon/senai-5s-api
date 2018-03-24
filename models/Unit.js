module.exports = (sequelize, DataTypes) => {  
    const Unit = sequelize.define('Unit', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER
        },		
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
    },  
    {
        tableName: 'units' 
    });
    
    return Unit;
  };