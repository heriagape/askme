const Sequelize = require('sequelize');
const sequelize = require('./ORM');
const bcrypt = require('bcrypt');

var User;

User = sequelize.define('user', {
    fname: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [1, 50]
        }
    },
    lname: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [1, 50]
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
            len: [1, 255]
        }
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: true,
            is: ["^[a-z]+$", 'i'],
            len: [4, 10]
        }
    },
    password_digest: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.VIRTUAL,
        validate: {
            notEmpty: true,
            len: [6, Infinity]
        }
    },
    password_confirmation: {
        type: Sequelize.VIRTUAL
    }

}, {
    // freezeTableName: true,
    indexes: [{unique: true, fields: ['email', 'username']}],
    /*instanceMethods: {
        authenticate: function (value) {
            if (bcrypt.compareSync(value, this.password_digest))
                return this;
            else
                return false;
        }
    },*/
    underscored: true
});

User.prototype.authenticate = function(value) {
    if (!bcrypt.compareSync(value, this.password_digest)) {
        return false;
    } else return this;
};

var hasSecurePassword = function (user, options, callback) {
    if (user.password != user.password_confirmation) {
        throw new Error("Password confirmation doesn't match Password");
    }
    bcrypt.hash(user.get('password'), 10, function (err, hash) {
        if (err) return callback(err);
        console.log(user);
        // user.password_digest = hash;
        user.set('password_digest', hash);
        // user.save();
        // console.log(user);
        return callback(null, options);
    });
};

User.beforeCreate(function (user, options, callback) {
    user.email = user.email.toLowerCase();
    user.username = user.username.toLowerCase();
    // console.log(user);
    if (user.password)
        hasSecurePassword(user, options, callback);
    else
        throw new Error("Need to provide password");
});

User.beforeUpdate(function (user, options, callback) {
    user.email = user.email.toLowerCase();
    user.username = user.username.toLowerCase();
    if (user.password)
        hasSecurePassword(user, options, callback);
    else
        return options;
});

module.exports = User;

