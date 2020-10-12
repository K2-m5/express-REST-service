const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:id/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.id);
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getId(
      req.params.boardId,
      req.params.taskId
    );
    await res.json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:id/tasks').post(async (req, res) => {
  try {
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.create(
      new Task({
        title,
        order,
        description,
        userId,
        boardId: req.params.id,
        columnId
      })
    );
    await res.json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Task not created');
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      }
    );
    res.json(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Task not updated');
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.taskId);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
