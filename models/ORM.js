const Sequelize = require('sequelize');

// $ npm install sqlite3 --build-from-source
// const sequelize = new Sequelize('sqlite://database/database.db');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/askmedb');


/*sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/


// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

module.exports = sequelize;
