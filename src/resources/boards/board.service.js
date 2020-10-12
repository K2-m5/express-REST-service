const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const create = board => {
  return boardRepo.create(board);
};

const getId = id => boardRepo.getId(id);

const update = (id, data) => boardRepo.update(id, data);

const remove = id => boardRepo.remove(id);

module.exports = { getAll, create, getId, update, remove };
