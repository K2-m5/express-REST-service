const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { ErrorHandler, catchError } = require('../../errorHandler/errorHandler');
const HttpStatus = require('http-status-codes');
const { isUUID } = require('../../utils/validatorId');

const STATUS_CODE = {
  '200': {
    all: 'Successful operation',
    create: 'The board has been created',
    update: 'The board has been updated'
  },
  '204': 'The board has been deleted',
  '404': 'Board not found'
};

router.route('/').get(
  catchError(async (req, res, next) => {
    const boards = await boardService.getAll();

    res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
    res.contentType = 'application/json';
    res
      .json(boards.map(Board.toResponse))
      .status(HttpStatus.OK)
      .end();
    next();
  })
);

router.route('/').post(
  catchError(async (req, res, next) => {
    const newBoard = req.body;
    const board = await boardService.create(newBoard);

    res.statusMessage = STATUS_CODE[HttpStatus.OK].create;
    res.contentType = 'application/json';
    res
      .json(Board.toResponse(board))
      .status(HttpStatus.OK)
      .end();
    next();
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const newBoardData = req.body;
    const boardId = req.params.id;

    if (!boardId || !isUUID(boardId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const board = await boardService.update(req.params.id, newBoardData);

    if (!board) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].update;
      res.contentType = 'application/json';
      res
        .json(Board.toResponse(board))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const board = await boardService.getId(req.params.id);

    if (!board) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(Board.toResponse(board))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const boardId = req.params.id;

    if (!boardId || !isUUID(boardId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }
    const deleteCount = await boardService.remove(boardId);

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

module.exports = router;
