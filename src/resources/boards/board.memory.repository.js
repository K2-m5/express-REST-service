const DB = require('../../common/dataBase');

const getAll = async () => {
  const boards = await DB.getAll();
  return boards;
};

module.exports = { getAll };
