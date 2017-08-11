const User = require('./User');
const Question = require('./Question');
const Answer = require('./Answer');


User.create({
    fname: "Heri",
    lname: "Agape",
    email: "agape@live.fr",
    password: "foobar",
    password_confirmation: "foobar"
});

Answer.belongsTo(Question);
Question.belongsTo(User);
Answer.belongsTo(User);

Question.hasMany(Answer);
User.hasMany(Question);
User.hasMany(Answer);

User.sync();
Question.sync();
Answer.sync();

// process.exit();