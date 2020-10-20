const DB = require('../../common/dataBase');
const NAME_DB = 'Users';

const getAll = async () => DB.getAll(NAME_DB);

const update = async (id, user) => DB.updateUser(NAME_DB, id, user);

const getId = async id => DB.getId(NAME_DB, id);

const remove = async id => DB.removeUser(id, NAME_DB);

const create = async user => DB.create(NAME_DB, user);

module.exports = { getAll, create, getId, remove, update };
