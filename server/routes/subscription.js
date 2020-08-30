const express = require('express');
const subscriptionService = require('../db/services/subscription');

const router = express();

router.post('/start', async (req, res) => {
  const { bookId, userId } = req.body;
  const subscription = await subscriptionService.start({ bookId, userId });

  res.send(subscription);
});

router.post('/end', async (req, res) => {
  const { bookId, userId } = req.body;
  const subscription = await subscriptionService.end({ bookId, userId });

  res.send(subscription);
});

module.exports = router;
