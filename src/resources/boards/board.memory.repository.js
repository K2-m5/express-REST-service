const DB = require('../../common/dataBase');
const Boards = require('./board.model');
const NAME_DB = 'Boards';

const getAll = async () => {
  const boards = await DB.getAll(NAME_DB);
  return boards;
};

const create = async board => {
  return DB.create(NAME_DB, new Boards(board));
};

const getId = async id => {
  const board = await DB.getId(NAME_DB, id);

  if (!board) {
    throw new Error(`The board with ${id} was not found`);
  }

  return board;
};

const update = async (id, data) => {
  const board = await DB.updateBoard(NAME_DB, id, data);

  if (!board) {
    throw new Error(`The board with ${id} was not found`);
  }

  return { board };
};

const remove = async id => {
  const board = await DB.getId(NAME_DB, id);
  if (!board) {
    throw new Error(`The board with ${id} was not found`);
  }
  await DB.remove(NAME_DB, id);
};

module.exports = { getAll, create, getId, update, remove };
