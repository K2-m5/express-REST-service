const DB = require('../../common/dataBase');

const getAll = async () => {
  const users = await DB.getAllUsers();

  if (!users) {
    throw new Error('The users was not found');
  }

  return users;
};

const update = async (id, user) => {
  const userUp = await DB.updateUser(id, user);

  if (!userUp) {
    throw new Error(`The user with ${id} was not found`);
  }

  return userUp;
};

const getId = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }

  return user;
};

const remove = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }
  await DB.removeUser(id);
};

const create = async user => {
  return DB.createUser(user);
};

module.exports = { getAll, create, getId, remove, update };
