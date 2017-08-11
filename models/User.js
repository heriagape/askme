const Sequelize = require('sequelize');
const sequelize = require('./ORM');
var bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  fname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
          isEmail: true,
          notEmpty: true,
          len: [1,255]
      }
  },
  username: {
    type: Sequelize.STRING,
      unique: true,
    validate: {
      is: ["^[a-z]+$",'i'],
      len: [4,10], }
  },
    password_digest: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, Infinity]
        }
    },
    password_confirmation: {
        type: Sequelize.VIRTUAL
    }

},{
    freezeTableName: true,
    indexes: [{unique: true, fields: ['email']}],
    instanceMethods: {
        authenticate: function(value) {
            if (bcrypt.compareSync(value, this.password_digest))
                return this;
            else
                return false;
        }
    },
    underscored: true
});

var hasSecurePassword = function(user, options, callback) {
    if (user.password != user.password_confirmation) {
        throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
        if (err) return callback(err);
        user.set('password_digest', hash);
        return callback(null, options);
    });
};

User.beforeCreate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    user.username = user.username.toLowerCase();
    if (user.password)
        hasSecurePassword(user, options, callback);
    else
        return callback(null, options);
});
User.beforeUpdate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password)
        hasSecurePassword(user, options, callback);
    else
        return callback(null, options);
});

module.exports = User;

