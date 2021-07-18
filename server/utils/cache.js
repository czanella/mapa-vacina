const cache = {};
const CACHE_DURATION = parseInt(process.env.SERVER_CACHE_DURATION) || 600000; // 10 minutes

const useCache = (cacheKey) => {
  return (req, res, next) => {
    if (cache[cacheKey]) {
      if (new Date() - cache[cacheKey].timestamp <= CACHE_DURATION) {
        res.json(cache[cacheKey].data);
        return;
      }
      delete cache[cacheKey];
    }

    next();
  };
};

const writeCache = (cacheKey, data) => {
  cache[cacheKey] = {
    timestamp: new Date(),
    data: data,
  };
};

module.exports = { useCache, writeCache };
