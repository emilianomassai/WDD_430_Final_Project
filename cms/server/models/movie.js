const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
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

module.exports = mongoose.model('Movie', movieSchema);
