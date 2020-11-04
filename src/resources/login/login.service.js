const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const usersService = require('../users/user.service');

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await usersService.checkLogin(username, password);
        console.log(user);
        if (!user) {
          return done(null, false, {
            message: 'Bad login/password combination'
          });
        }
        return done(null, user);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    if (!token) {
      return done(null, false);
    }
    try {
      const user = await usersService.getToken(token);
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    } catch (error) {
      return done(null, false);
    }
  })
);

const login = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user;

    return next();
  })(req, res, next);
};

const loginLocal = (req, res, next) => {
  passport.authenticate(
    'local',
    {
      failureRedirect: '/login',
      session: false
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send('Unauthorized');
      }
      res.user = user;
      return next();
    }
  )(req, res, next);
};

module.exports = { login, loginLocal };
