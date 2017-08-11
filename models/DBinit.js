const Sequelize = require('sequelize');

// $ npm install sqlite3 --build-from-source
// const sequelize = new Sequelize('sqlite://database/database.db');

const sequelize = new Sequelize(HEROKU_POSTGRESQL_DBNAME_URL);

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully.');
  }).catch(function(err){
    console.error('Unable to connect to the database:', err);
  });


// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const User = sequelize.define('user', {
  fname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true }
  },
  username: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],
      len: [4,10] }
  }

},{underscored: true});


const Answer = sequelize.define('answer', {

  answer: {
    type: Sequelize.TEXT
  }

},{underscored: true});


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




Answer.belongsTo(Question);
Question.belongsTo(User);
Answer.belongsTo(User);

Question.hasMany(Answer);
User.hasMany(Question);
User.hasMany(Answer);

User.sync();
Question.sync();
Answer.sync();


