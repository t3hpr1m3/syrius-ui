var config = require('config');

exports = module.exports = require('./webpack.config.' + config.get('env'));
