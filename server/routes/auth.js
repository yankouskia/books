const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-github');

const users = require('../db/services/user');
const JWT_KEY = 'something_private_and_long_enough_to_secure';

const router = express();

passport.use(
  new Strategy(
    {
      clientID: 'bf2283aa2d99a216245e',
      clientSecret: '2a32723aa5eb4cb11f60f86df2ffe38f4cf629e4',
      callbackURL: 'http://localhost:3000/api/v1/auth/callback',
    },

    function (accessToken, refreshToken, profile, cb) {
      users.findOrCreate(profile);
      return cb(null, profile);
    }
  )
);

router.get(
  '/',
  (req, res, next) => {
    const { redirectTo } = req.query;
    const state = JSON.stringify({ redirectTo });
    const authenticator = passport.authenticate('github', { scope: [], state, session: true });
    authenticator(req, res, next);
  },
  (req, res, next) => {
    next();
  }
);

router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
  const token = jwt.sign({ id: req.user.id }, JWT_KEY, { expiresIn: 60 * 60 * 24 * 1000 });
  req.logIn(req.user, function (err) {
    if (err) return next(err);
    res.redirect(`http://localhost:3000?token=${token}`);
  });
});
module.exports = router;
