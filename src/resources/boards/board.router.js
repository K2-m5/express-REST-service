const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(Board.fromRequest(req.body));
  res.json(Board.toResponse(board));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.getId(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(
    req.params.id,
    Board.fromRequest(req.body)
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardService.remove(req.params.id);
    res.status(200).send('OK');
  } catch (error) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
