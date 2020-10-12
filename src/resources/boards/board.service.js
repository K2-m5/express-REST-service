const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const create = board => {
  return boardRepo.create(board);
};

module.exports = { getAll, create };
