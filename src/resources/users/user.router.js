const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler, catchError } = require('../../errorHandler/errorHandler');
const HttpStatus = require('http-status-codes');
const { isUUID } = require('../../utils/validatorId');

const STATUS_CODE = {
  '200': {
    all: 'Successful operation',
    create: 'The user has been created',
    update: 'The user has been updated'
  },
  '204': 'The user has been deleted',
  '404': 'User not found'
};

router.route('/').get(
  catchError(async (req, res, next) => {
    const users = await usersService.getAll();
    res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
    res.contentType = 'application/json';
    res
      .json(users.map(User.toResponse))
      .status(HttpStatus.OK)
      .end();
    next();
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const userId = req.params.id;
    if (!userId || !isUUID(userId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }
    const user = await usersService.getId(userId);

    if (!user) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(User.toResponse(user))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const newUserData = req.body;
    const userId = req.params.id;

    if (!userId || !isUUID(userId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }
    const user = await usersService.update(userId, newUserData);

    if (!user) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].update;
      res.contentType = 'application/json';
      res
        .json(User.toResponse(user))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const userId = req.params.id;

    if (!userId || !isUUID(userId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const deleteCount = await usersService.remove(userId);

    if (deleteCount === 0) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.NO_CONTENT];
      res.status(HttpStatus.NO_CONTENT).end();
    }
    next();
  })
);

router.route('/').post(
  catchError(async (req, res, next) => {
    const user = await usersService.create(User.fromRequest(req.body));
    res.statusMessage = STATUS_CODE[HttpStatus.OK].update;
    res.contentType = 'application/json';
    res
      .json(User.toResponse(user))
      .status(HttpStatus.OK)
      .end();
    next();
  })
);

module.exports = router;
