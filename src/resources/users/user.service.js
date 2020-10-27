const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const getId = id => usersRepo.getId(id);

const remove = id => usersRepo.remove(id);

const update = (id, user) => usersRepo.update(id, user);

const create = user => {
  return usersRepo.create(user);
};

module.exports = { getAll, create, getId, remove, update };
