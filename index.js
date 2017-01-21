var throng = require('throng');

throng({
    start: require('./server').start,
    workers: process.env.APP_ENV === 'local' ? 1 : undefined,
    lifetime: Infinity
});