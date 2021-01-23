const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require('./models/User'); // <-- ERIK
const Place = require('./models/Place'); // <-- ERIK

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/campdb', {
  // <-- ERIK
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API ROUTES
// <-- JACOB

app.get('/api/users', (req, res) => {
  User.find({}).then(data => res.json(data));
});

app.post('/api/users', (req, res) => {
  User.create(req.body).then(data => res.json(data));
});

app.get('/api/campsites', (req, res) => {
  Place.find({}).then(data => res.json(data));
});

app.post('/api/campsites', (req, res) => {
  Place.create(req.body).then(data => res.json(data));
});

// END API ROUTES

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));
