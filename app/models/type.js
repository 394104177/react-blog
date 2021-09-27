// eslint-disable-next-line strict
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: Number,
  },
  typeName: {
    type: String,
  },
  orderNum: {
    type: Number,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model('Type', schema);
