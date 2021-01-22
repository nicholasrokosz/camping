const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  coords: [{ longitude: Number, latitude: Number }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
