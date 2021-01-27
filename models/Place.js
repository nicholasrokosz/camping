const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  // coords: [{ longitude: Number, latitude: Number }],
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
