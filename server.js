const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const router = require('./routes/apiRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const Place = require('./models/Place'); // <-- ERIK

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ParkPaldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));
