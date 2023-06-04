const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.APP_PORT || '80', 10);
