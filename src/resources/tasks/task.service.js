const tasksRepo = require('./task.db.repository');

const getAll = id => tasksRepo.getAll(id);

const getId = (id, boardId) => {
  return tasksRepo.getId(id, boardId);
};

const create = (task, boardId) => {
  return tasksRepo.create(task, boardId);
};

const update = (taskId, taskData, boardId) => {
  return tasksRepo.update(taskId, taskData, boardId);
};

const remove = (taskId, boardId) => {
  return tasksRepo.remove(taskId, boardId);
};

const deleteTaskByBoardId = boardId => tasksRepo.deleteTaskByBoardId(boardId);
const deleteUserInTask = userId => tasksRepo.deleteUserInTask(userId);

module.exports = {
  getAll,
  getId,
  create,
  update,
  remove,
  deleteTaskByBoardId,
  deleteUserInTask
};
