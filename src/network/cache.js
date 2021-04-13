const cacheMap = {};

const setCache = (cacheName, cacheValue) => {
    cacheMap[cacheName] = cacheValue;
};

const getCache = cacheName => cacheMap[cacheName];

module.exports = {
    setCache,
    getCache
};