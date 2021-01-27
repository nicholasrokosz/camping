const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const router = require('./routes/apiRoutes')
// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://parkpal.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: 'https://parkpal.us.auth0.com/api/v2/',
  issuer: `https://parkpal.us.auth0.com/`,
  algorithms: ['RS256'],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

const User = require('./models/User'); // <-- ERIK
const Place = require('./models/Place'); // <-- ERIK

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ParkPaldb', {
  // <-- ERIK
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API ROUTES
// <-- JACOB

// server.js

// This route doesn't need authentication
app.get('/api/public', function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function (req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated to see this.',
  });
});



// END API ROUTES

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));
