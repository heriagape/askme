const Sequelize = require('sequelize');
const sequelize = require('./ORM');

const Answer = sequelize.define('answer', {

  answer: {
    type: Sequelize.TEXT
  }

},{underscored: true});

module.exports = Answer;