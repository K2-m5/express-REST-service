const {
  db,
  creatNewUser,
  removeUser,
  findUser,
  updateUser
} = require('../../dataBase/dataBase');
// const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return db.Users;
};

const update = (id, user) => {
  updateUser(id, user);
  return db.Users;
};

const getId = async id => {
  return findUser(id);
};

const remove = async id => {
  removeUser(id);
  return db.Users;
};

const creat = async user => {
  creatNewUser(user);
  return db.Users;
};

module.exports = { getAll, creat, getId, remove, update };
