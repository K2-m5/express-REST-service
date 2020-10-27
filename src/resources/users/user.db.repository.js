const User = require('./user.model');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = async () => {
  return User.find();
};

const getId = async id => {
  return User.findById(id);
};

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

module.exports = {
  getAll,
  getId,
  create,
  update,
  remove
};
