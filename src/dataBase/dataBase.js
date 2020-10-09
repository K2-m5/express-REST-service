const User = require('../resources/users/user.model');

const db = {
  Users: []
};

const creatNewUser = user => {
  db.Users.push(user);
};

const updateUser = (id, data) => {
  const { name, login, password } = data;
  const idx = findIndex(id);
  db.Users[idx] = {
    id,
    name,
    login,
    password
  };
};

const findUser = id => {
  return db.Users.find(item => item.id === id);
};

const findIndex = id => {
  return db.Users.findIndex(item => item.id === id);
};

const removeUser = async id => {
  const idx = findIndex(id);
  const arrStart = db.Users.slice(0, idx);
  const arrFinish = db.Users.slice(idx + 1);
  db.Users = arrStart.concat(arrFinish);
};

const dbInit = () => {
  for (let i = 0; i < 3; i += 1) {
    db.Users.push(new User());
  }
};

dbInit();

module.exports = { db, creatNewUser, removeUser, findUser, updateUser };
