const passport = require('passport');
const loginService = require('./login.service');
const httpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const allowUrl = ['/', '/doc', '/login'];

const localStrategy = app => {
  loginService.localPassport();
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', {}, (err, user) => {
      if (user) {
        res.json({
          token: jwt.sign({ id: user.id, login: user.login }, JWT_SECRET_KEY)
        });
      } else {
        res.status(httpStatus.FORBIDDEN).send(err);
      }
    })(req, res, next);
  });
};

const jwtStrategy = app => {
  loginService.jwtPassport();

  app.use((req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (allowUrl.includes(req.url) || user) {
        return next();
      }
      res.status(httpStatus.UNAUTHORIZED).send(err);
    })(req, res, next);
  });
};

const authRouter = app => {
  app.use(passport.initialize());
  localStrategy(app);
  jwtStrategy(app);
};

module.exports = authRouter;
