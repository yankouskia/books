const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books-subscribtions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', e => {
  logger.error(e.toString(), true);
  logger.error(e.stack, true);
  process.exit(1);
});

db.once('open', async function () {
  console.info('DB Connected Successfully');
});

module.exports = mongoose;
