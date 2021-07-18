const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
});

const express = require('express');
const api = require('./api');

const port = process.env.SERVER_PORT || 3001;

const app = express();
app.use('/api', api);

app.listen(port);

console.log(`Server listening on port ${port}`);
