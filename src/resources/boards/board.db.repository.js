const Board = require('./board.model');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = async () => {
  return Board.find();
};

const getId = async id => {
  return Board.findById(id);
};

const create = async boardData => {
  return Board.create(boardData);
};

const update = async (_id, boardData) => {
  return Board.updateOne({ _id }, boardData);
};

const remove = async id => {
  const board = await getId(id);
  if (board) {
    await tasksRepo.deleteTaskByBoardId(id);
    await board.remove();
    return board;
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
