const express = require('express');
const bookService = require('../db/services/book');
const sellerService = require('../db/services/seller');

const router = express();

router.post('/create', async (req, res) => {
  const { book, token } = req.body;

  try {
    const seller = await sellerService.getByToken(token);
    const bookData = await bookService.create({ ...book, sellerId: seller._id });
    res.send(bookData);
  } catch (e) {
    res.status(405).send('Operation is now allowed, seller does not exist');
  }
});

router.get('/all', async (req, res) => {
  try {
    const books = await bookService.readAll();
    res.send(books);
  } catch (e) {
    res.status(503).send('DB is unavailable');
  }
});

module.exports = router;
