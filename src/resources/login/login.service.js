const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersService = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const OPTION = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
};

const localPassport = () =>
  passport.use(
    new LocalStrategy(
      { usernameField: 'login' },
      async (username, password, done) => {
        try {
          const user = await usersService.getByKey('login', username);
          if (!user) {
            return done(null, false, {
              message: 'Bad login/password combination'
            });
          }
          const match = await usersService.verify(user, password);
          if (!match) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

const jwtPassport = () =>
  passport.use(
    new JwtStrategy(OPTION, async (payload, done) => {
      try {
        const user = await usersService.getId(payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

module.exports = { localPassport, jwtPassport };
