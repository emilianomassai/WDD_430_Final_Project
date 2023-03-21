const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let documentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  trailerUrl: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('Movie', documentSchema);
