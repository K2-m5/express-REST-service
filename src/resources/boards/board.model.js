const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: [
    { id: { type: String, default: uuid }, title: String, order: Number }
  ],
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
