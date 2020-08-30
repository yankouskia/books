const express = require('express');
const sellerService = require('../db/services/seller');

const router = express();

router.post('/create', async (req, res) => {
  const { seller } = req.body;
  const sellerData = await sellerService.create(seller);

  res.send(sellerData);
});

module.exports = router;
