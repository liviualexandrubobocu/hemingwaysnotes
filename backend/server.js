// server.js
const express = require('express');
const app = express();
const port = 3000;

// Import the user code dynamically
let userCode;

function loadUserCode() {
  delete require.cache[require.resolve('./code/app')];
  userCode = require('./code/app');
}

// Initial load
loadUserCode();

// Middleware to reload user code on each request
app.use((req, res, next) => {
  loadUserCode();
  next();
});

// Use the user-defined routes or handlers
app.use('/', (req, res) => {
  if (userCode && typeof userCode.handler === 'function') {
    userCode.handler(req, res);
  } else {
    res.send('No user code defined.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
