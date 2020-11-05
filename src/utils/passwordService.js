const bcrypt = require('bcrypt');
const { SALT } = require('../common/config');
const { ErrorHandler } = require('../errorHandler/errorHandler');
const HttpStatus = require('http-status-codes');

const hashPassword = async password => {
  return await bcrypt
    .hash(password, parseInt(SALT, 10))
    .then(hash => {
      return hash;
    })
    .catch(() => {
      throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR);
    });
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, checkPassword };
