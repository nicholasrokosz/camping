const router = require('express').Router()
const User = require('../models/User'); // <-- ERIK
const Place = require('../models/Place'); // <-- ERIK

router.get('/api/users', (req, res) => {
  User.find({}).then(data => res.json(data));
});

router.post('/api/users', (req, res) => {
  User.create(req.body).then(data => res.json(data));
});


router.get('/api/campsites', (req, res) => {
  Place.find({}).then(data => res.json(data));
});

router.post('/api/campsites', (req, res) => {
  Place.create(req.body).then(data => res.json(data));
});

module.exports = router