const Sequelize = require('sequelize');
const sequelize = require('./ORM');

var Question;

Question = sequelize.define('question', {
  question: {
    type: Sequelize.STRING
  },
  answered: { 
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{underscored: true});

module.exports = Question;