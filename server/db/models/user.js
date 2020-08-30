const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  authId: { type: Number, required: true },
  email: { type: Object, required: true },
  fullname: { type: String, required: true },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
