'use strict'

var config = require('config');

console.log('Syrius starting in ' + config.get('env') + ' mode');

var serverPath = '../dist/server';

if (config.get('env') === 'development') {
  serverPath = './www-dev';
}

require(serverPath);
