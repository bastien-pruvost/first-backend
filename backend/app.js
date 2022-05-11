const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const path = require('path');

mongoose
  .connect(
    'mongodb+srv://public:public-password@my-first-db.2scc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion a MongoDB réussie !'))
  .catch(() => console.log('Connexion a MongoDB échouée...'));

const app = express();

// ------ HEADERS ------

// Set Headers for Everyone
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Allow API access to requests json bodies
app.use(express.json());

// Assign path to the routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Exports app ---
module.exports = app;
