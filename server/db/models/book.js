const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: String, required: true },
});

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
