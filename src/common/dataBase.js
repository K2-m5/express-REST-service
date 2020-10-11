const User = require('../resources/users/user.model');

const DB = {
  Users: []
};

const getAllUsers = () => {
  return DB.Users.slice(0);
};

const createUser = user => {
  DB.Users.push(user);
  return user;
};

const updateUser = (id, data) => {
  const { name, login, password } = data;
  const idx = findIndex(id);
  DB.Users[idx] = {
    id,
    name,
    login,
    password
  };
  return DB.Users.slice(0)[idx];
};

const getUser = id => {
  return DB.Users.find(item => item.id === id);
};

const findIndex = id => {
  return DB.Users.findIndex(item => item.id === id);
};

const removeUser = id => {
  const idx = findIndex(id);
  const arrStart = DB.Users.slice(0, idx);
  const arrFinish = DB.Users.slice(idx + 1);
  DB.Users = arrStart.concat(arrFinish);
  return DB.Users.slice(0);
};

const DBInit = () => {
  for (let i = 0; i < 3; i += 1) {
    DB.Users.push(new User());
  }
};

DBInit();

module.exports = { getAllUsers, createUser, removeUser, getUser, updateUser };
