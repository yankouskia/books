const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  active: { type: Boolean, required: true },
});

module.exports = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
