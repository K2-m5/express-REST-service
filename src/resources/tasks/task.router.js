const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const { ErrorHandler, catchError } = require('../../errorHandler/errorHandler');
const HttpStatus = require('http-status-codes');
const { isUUID } = require('../../utils/validatorId');

const STATUS_CODE = {
  '200': {
    all: 'Successful operation',
    create: 'The task has been created',
    update: 'The task has been updated'
  },
  '204': 'The task has been deleted',
  '404': 'Task not found'
};

router.route('/:id/tasks').get(
  catchError(async (req, res, next) => {
    const boardId = req.params.id;
    if (!boardId || !isUUID(boardId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const tasks = await tasksService.getAll(boardId);
    if (!tasks) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(tasks.map(item => Task.toResponse(item)))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:boardId/tasks/:taskId').get(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const task = await tasksService.getId(taskId, boardId);
    if (!task) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].all;
      res.contentType = 'application/json';
      res
        .json(Task.toResponse(task))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:boardId/tasks').post(
  catchError(async (req, res, next) => {
    const newData = req.body;
    const boardId = req.params.boardId;
    if (!boardId || !isUUID(boardId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const task = await tasksService.create(newData, boardId);
    res.statusMessage = STATUS_CODE[HttpStatus.OK].create;
    res.contentType = 'application/json';
    res
      .json(Task.toResponse(task))
      .status(HttpStatus.OK)
      .end();
    next();
  })
);

router.route('/:boardId/tasks/:taskId').put(
  catchError(async (req, res, next) => {
    const newTaskData = req.body;
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const task = await tasksService.update(taskId, boardId, newTaskData);
    if (!task) {
      throw new ErrorHandler(
        HttpStatus.NOT_FOUND,
        STATUS_CODE[HttpStatus.NOT_FOUND]
      );
    } else {
      res.statusMessage = STATUS_CODE[HttpStatus.OK].update;
      res.contentType = 'application/json';
      res
        .json(Task.toResponse(task))
        .status(HttpStatus.OK)
        .end();
    }
    next();
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
      throw new ErrorHandler(HttpStatus.BAD_REQUEST);
    }

    const deleteCount = await tasksService.remove(taskId, boardId);
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
