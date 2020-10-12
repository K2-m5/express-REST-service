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

module.exports = { getAll, create };
