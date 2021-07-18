const express = require('express');
const { vaccineStatus, VACCINE_CACHE_KEY } = require('./vaccineStatus');
const { useCache } = require('../utils/cache');

const api = express();

api.get('/vaccine-status', useCache(VACCINE_CACHE_KEY), vaccineStatus);

module.exports = api;
