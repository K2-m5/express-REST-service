const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const login = require('./resources/login/login.router');

const { morgan, logger } = require('./middleware/logger');
const { returnError } = require('./errorHandler/errorHandler');
const passport = require('passport');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(passport.initialize());

app.use(
  morgan(
    ':method :status :url query=:query body=:body size :res[content-length] - :response-time ms',
    {
      stream: logger.stream
    }
  )
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', login, userRouter);
app.use('/boards', login, boardsRouter);
app.use('/boards', login, tasksRouter);
app.use('/login', loginRouter);
app.use('*', login);

app.use((err, req, res, next) => {
  returnError(err, res);
  next();
});

module.exports = app;
