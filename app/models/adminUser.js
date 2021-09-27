// eslint-disable-next-line strict
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userName: { type: String },
  passWord: { type: String },
});

module.exports = mongoose.model('Username', schema);
