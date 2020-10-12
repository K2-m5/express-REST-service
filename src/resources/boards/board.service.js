const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const create = board => {
  return boardRepo.create(board);
};
const getId = id => boardRepo.getId(id);

module.exports = { getAll, create, getId };
