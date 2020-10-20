const DB = require('../../common/dataBase');
const NAME_DB = 'Tasks';

const getAll = async id => DB.getAllTasks(id);

const create = async task => DB.create(NAME_DB, task);

const getId = async (boardId, taskId) => DB.getTask(boardId, taskId);

const update = async (boardId, taskId, taskData) =>
  DB.updateTask(boardId, taskId, taskData);

const remove = async (boardId, taskId) => DB.removeTask(boardId, taskId);

module.exports = { getAll, getId, create, update, remove };
