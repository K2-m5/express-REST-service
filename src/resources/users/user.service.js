/* eslint-disable require-atomic-updates */
const usersRepo = require('./user.db.repository');
const passwordService = require('../../utils/passwordService');
const tokenService = require('../../utils/tokenService');

const getAll = () => usersRepo.getAll();

const getId = id => usersRepo.getId(id);

const remove = id => usersRepo.remove(id);

const update = async (id, user) => {
  const hash = await passwordService.hashPassword(user.password);
  user.password = hash;
  return await usersRepo.updateUserById(id, user);
};

const create = async user => {
  const hash = await passwordService.hashPassword(user.password);
  user.password = hash;
  return await usersRepo.setUser(user);
};

const checkLogin = async (login, password) => {
  const user = await usersRepo.getLogin(login);
  console.log(user);
  if (!user) {
    return 0;
  }
  const isCheck = passwordService.checkPassword(password, user.password);
  console.log(isCheck);
  return isCheck ? user : 0;
};

const getToken = async token => {
  const { user } = await tokenService.getDataFromToken(token);
  return await getId(user);
};

module.exports = {
  getAll,
  create,
  getId,
  remove,
  update,
  checkLogin,
  getToken
};
