const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String
  },
  release_date: {
    type: String
  },
  poster_path: {
    type: String
  },
  vote_average: {
    type: String
  },
});

module.exports = mongoose.model('Contact', contactSchema);
