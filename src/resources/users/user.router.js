const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getId(req.params.id);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    req.params.id,
    User.fromRequest(req.body)
  );
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const users = await usersService.remove(req.params.id);
  res.status(200).send(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.creat(User.fromRequest(req.body));
  res.status(200).send(User.toResponse(user));
});

module.exports = router;
