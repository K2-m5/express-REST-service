const User = require('./user.model');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = async () => {
  return User.find();
};

const getId = async id => {
  return User.findById(id);
};

const getByKey = async (key, value) => User.findOne({ [key]: value });

const create = async userData => {
  return User.create(userData);
};

const update = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const remove = async id => {
  const foundUser = await User.findById(id);
  if (foundUser) {
    await foundUser.remove();
    await tasksRepo.deleteUserInTask(id);
    return foundUser;
  }
  return false;
};

const getLogin = async login => {
  const user = await User.findOne({ login });
  return user;
};

module.exports = {
  getAll,
  getId,
  getByKey,
  create,
  update,
  remove,
  getLogin
};
