const router = require('express').Router();
const Place = require('../models/Place');

router.get('/api/campsites', (req, res) => {
  Place.find({}).then(data => res.json(data));
});

router.post('/api/campsites', (req, res) => {
  Place.create(req.body).then(data => res.json(data));
});

module.exports = router;
