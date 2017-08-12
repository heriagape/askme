const Sequelize = require('sequelize');
const sequelize = require('./ORM');

var Answer = sequelize.define('answer', {

  answer: {
    type: Sequelize.TEXT
  }

},{underscored: true});

module.exports = Answer;