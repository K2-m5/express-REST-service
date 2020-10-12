const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const getId = (boardId, taskId) => tasksRepo.getId(boardId, taskId);

const create = task => tasksRepo.create(task);

const update = (boardId, taskId, taskData) =>
  tasksRepo.update(boardId, taskId, taskData);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, getId, create, update, remove };
