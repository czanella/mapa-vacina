const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
});

const express = require('express');
const cors = require('cors');
const api = require('./api');

// The serber port
const port = process.env.SERVER_PORT || 3001;

// Setup cors
const corsAllowList = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://0.0.0.0:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsAllowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Build the app
const app = express();
app.use('/api', cors(corsOptions), api);

app.listen(port);

console.log(`Server listening on port ${port}`);
