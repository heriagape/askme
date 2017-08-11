const Question = sequelize.define('question', {
  question: {
    type: Sequelize.STRING
  },
  answered: { 
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{underscored: true});
