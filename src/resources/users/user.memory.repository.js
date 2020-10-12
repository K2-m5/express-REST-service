const DB = require('../../common/dataBase');
const NAME_DB = 'Users';

const getAll = async () => {
  const users = await DB.getAll(NAME_DB);

  if (!users) {
    throw new Error('The users was not found');
  }

  return users;
};

const update = async (id, user) => {
  const userUp = await DB.updateUser(NAME_DB, id, user);

  if (!userUp) {
    throw new Error(`The user with ${id} was not found`);
  }

  return userUp;
};

const getId = async id => {
  const user = await DB.getId(NAME_DB, id);

  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }

  return user;
};

const remove = async id => {
  const user = await DB.getId(NAME_DB, id);
  if (!user) {
    throw new Error(`The user with ${id} was not found`);
  }
  await DB.removeUser(id, NAME_DB);
};

const create = async user => {
  return DB.create(NAME_DB, user);
};

module.exports = { getAll, create, getId, remove, update };
