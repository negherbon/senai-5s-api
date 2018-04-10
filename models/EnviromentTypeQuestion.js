module.exports = (sequelize, DataTypes) => {
    var EnviromentTypeQuestion = sequelize.define('EnviromentTypeQuestion', {
      enviroment_types_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      questions_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      }

    }, {
      classMethods: {
        associate: function(models) {
      }
    },
    
    tableName: 'enviroment_types_has_questions' 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    });

    EnviromentTypeQuestion.associate = (models) => {
      EnviromentTypeQuestion.belongsTo(models.EnviromentType);
      EnviromentTypeQuestion.belongsTo(models.Question);
    }

    return EnviromentTypeQuestion;
  };