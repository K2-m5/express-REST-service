const { db } = require('../../dataBase/dataBase');
// const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return db.Users;
};

module.exports = { getAll };
