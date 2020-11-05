const usersRepo = require('./user.db.repository');
const passwordService = require('../../utils/passwordService');
const tokenService = require('../../utils/tokenService');
const bcrypt = require('bcrypt');

const getAll = () => usersRepo.getAll();

const getId = id => usersRepo.getId(id);

const getByKey = (key, value) => usersRepo.getByKey(key, value);

const remove = id => usersRepo.remove(id);

const update = async (id, user) => {
  return usersRepo.update(id, user);
};

const create = async user => {
  const hash = await passwordService.hashPassword(user.password);
  return usersRepo.create({ ...user, password: hash });
};

const verify = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};

const getToken = async token => {
  const { user } = await tokenService.getDataFromToken(token);
  return await usersRepo.getId(user.id);
};

module.exports = {
  getAll,
  create,
  getId,
  getByKey,
  remove,
  update,
  verify,
  getToken
};
