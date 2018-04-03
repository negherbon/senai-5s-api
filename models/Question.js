module.exports = (sequelize, DataTypes) => {  
    
    var Question = sequelize.define('Question', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
    },
    {
        //para não ficar com table name zuado no banco
        tableName: 'questions' 
    });

    Question.associate = (models) => {
        Question.belongsToMany(models.Enviroment, {
            through: 'enviroments_has_questions',
            as: 'questions',
            foreignKey: 'questions_id'
        });
    }

    return Question;
};