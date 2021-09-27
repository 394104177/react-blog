// eslint-disable-next-line strict
const mongoose = require('mongoose');
require('./type');
const schema = new mongoose.Schema({
  id: { type: Number },
  typeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Type',
  },
  title: { type: String },
  articleContent: { type: String },
  introduce: { type: String },
  addTime: { type: Date, default: new Date() },
  viewCount: { type: Number },
});

module.exports = mongoose.model('Article', schema);
