const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sequenceSchema = new Schema({
  maxMovieId: {
    type: Number,
    required: true
  },
  maxMessageId: {
    type: Number,
    required: true
  },
  maxTrendingMovieId: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Sequence', sequenceSchema);


