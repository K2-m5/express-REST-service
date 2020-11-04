const router = require('express').Router();
const httpStatus = require('http-status-codes');

const { login, loginLocal } = require('./login.service');
const tokenService = require('../../utils/tokenService');
const userService = require('../../resources/users/user.service');
const User = require('../users/user.model');

router.route('/').post(loginLocal, async (req, res) => {
  console.log('res.user', res.user);
  if (!res.user) {
    res
      .statusCode(httpStatus.FORBIDDEN)
      .send(httpStatus.getStatusCode(httpStatus.FORBIDDEN));
  }

  const user = await userService.getId(req.user.id);

  if (!user) {
    res
      .statusCode(httpStatus.FORBIDDEN)
      .send(httpStatus.getStatusCode(httpStatus.FORBIDDEN));
  } else {
    const token = tokenService.createToken(res.user);
    res.send({ user: User.toResponse(user), token });
  }
});

module.exports = [router, login];
