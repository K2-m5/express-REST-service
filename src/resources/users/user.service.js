const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getId = id => usersRepo.getId(id);

const remove = id => usersRepo.remove(id);

const update = (id, user) => usersRepo.update(id, user);

const creat = user => {
  return usersRepo.creat(new User(user));
};

module.exports = { getAll, creat, getId, remove, update };
