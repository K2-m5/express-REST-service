const User = require('../resources/users/user.model');

const db = {
  Users: []
};

const dbInit = () => {
  for (let i = 0; i < 3; i += 1) {
    db.Users.push(new User());
  }
};

dbInit();

module.exports = { db };
