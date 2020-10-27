const boardRepo = require('./board.db.repository');

const getAll = () => boardRepo.getAll();

const create = board => {
  return boardRepo.create(board);
};

const getId = id => {
  return boardRepo.getId(id);
};

const update = (id, data) => {
  return boardRepo.update(id, data);
};

const remove = id => {
  return boardRepo.remove(id);
};

module.exports = { getAll, create, getId, update, remove };
