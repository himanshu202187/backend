const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: { type: Array, required: true },
  isPublic: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('List', ListSchema);
