const DB = require('../../common/dataBase');
const Boards = require('./board.model');
const NAME_DB = 'Boards';

const getAll = async () => DB.getAll(NAME_DB);

const create = async board => DB.create(NAME_DB, new Boards(board));

const getId = async id => DB.getId(NAME_DB, id);

const update = async (id, data) => DB.updateBoard(NAME_DB, id, data);

const remove = async id => DB.remove(NAME_DB, id);

module.exports = { getAll, create, getId, update, remove };
