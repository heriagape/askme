// import User Model
User.prototype.getFullname = function() {
  return [this.fname, this.lname].join(' ');
};