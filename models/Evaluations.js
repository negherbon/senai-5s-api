module.exports = (sequelize, DataTypes) => {  
    
    var Evaluation = sequelize.define('Evaluation', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        createDate: {
            type: DataTypes.DATE
        },
        dueDate: {
            type: DataTypes.DATE
        },
        attachment: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.FLOAT
        }
    });

    return Evaluation;
};