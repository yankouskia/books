const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const passport = require('passport');
const { destroyCookie } = require('nookies');
const book = require('./routes/book');
const seller = require('./routes/seller');
const subscription = require('./routes/subscription');
const auth = require('./routes/auth');
const user = require('./routes/user');

require('./db/mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json({ limit: '50mb' }));
    server.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
    });

    server.use(passport.initialize());
    passport.serializeUser(function (user, cb) {
      cb(null, user);
    });

    server.use('/api/v1/book', book);
    server.use('/api/v1/seller', seller);
    server.use('/api/v1/subscription', subscription);
    server.use('/api/v1/auth', auth);
    server.use('/api/v1/user', user);

    server.get('/logout', (req, res) => {
      destroyCookie({ res }, 'authorization');
      res.redirect('/');
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
