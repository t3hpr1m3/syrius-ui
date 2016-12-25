'use strict'

var config = require('config');
var path = require('path');
var serverConfig = require('../webpack/server');

console.log('Syrius starting in ' + config.get('env') + ' mode');

var serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

if (config.get('env') === 'development') {
  serverPath = './www-dev';
}

require(serverPath);
