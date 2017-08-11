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
      len: [4,10], }
  }

},{underscored: true});

