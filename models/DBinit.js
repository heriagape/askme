const sequelize = require('./ORM');

const User = require('./User');
const Question = require('./Question');
const Answer = require('./Answer');


Question.hasMany(Answer);
User.hasMany(Question);
User.hasMany(Answer);

Answer.belongsTo(Question);
Question.belongsTo(User);
Answer.belongsTo(User);

sequelize.sync().then(function () {
    User.create({
        fname: "Heri",
        lname: "Agape",
        username: "heri",
        email: "agape@live.fr",
        password: "foobar",
        password_confirmation: "foobar"
    }).then(function () {
        process.exit();
    });

});






//