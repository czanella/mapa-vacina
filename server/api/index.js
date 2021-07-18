const express = require('express');
const { vaccineStatus } = require('./vaccineStatus');

const api = express();

api.get('/vaccine-status', vaccineStatus);

module.exports = api;
