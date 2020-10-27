const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({
    boardId
  });
};

const getId = async (_id, boardId) => {
  return Task.findOne({ _id, boardId });
};

const create = async (taskData, boardId) => {
  taskData.boardId = boardId;
  const newTask = Task.create(taskData);
  return newTask;
};

const update = async (_id, boardId, taskData) => {
  const foundTask = await getId(_id, boardId);
  if (foundTask) {
    await foundTask.updateOne(taskData);
  }
  return foundTask;
};

const remove = async (_id, boardId) => {
  const foundTask = await getId(_id, boardId);
  if (foundTask) {
    await foundTask.remove();
    return foundTask;
  }
  return false;
};

const deleteTaskByBoardId = async boardId => {
  return await Task.deleteMany({ boardId });
};

const deleteUserInTask = async userId => {
  return await Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  remove,
  deleteTaskByBoardId,
  deleteUserInTask
};
