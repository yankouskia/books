const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  token: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);
