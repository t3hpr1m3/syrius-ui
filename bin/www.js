'use strict'

require('babel-register');

var config = require('config'),
    app = require('../src/server').app;

app.set('port', config.get('port'));

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on ' + server.address().port + ' ...');
});
