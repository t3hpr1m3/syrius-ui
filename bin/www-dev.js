'use strict'

var config = require('config'),
    path = require('path'),
    serverConfig = require('../webpack/server'),
    webpack = require('webpack');

var serverDistPath = path.join(serverConfig.output.path, serverConfig.output.filename);

// Shamelessly borrowed from http://www.reactjunkie.com/universal-hot-reload/
function watchServerChanges() {
  var httpServerObject = null;
  var compiler = webpack(serverConfig);
  var compilerOptions = {};

  compiler.watch(compilerOptions, function onServerChange(err, stats) {
    if (err) {
      console.log('Server bundling error: ', JSON.stringify(err));
      return;
    }

    clearCache();

    if (httpServerObject === null) {
      httpServerObject = initHttpServer();
    } else {
      httpServerObject.httpServer.close(function() {
        httpServerObject = initHttpServer();
        console.log('Server restarted ' + new Date());
      });

      var ids = Object.keys(httpServerObject.sockets);
      for (var i = 0; i < ids.length; i++) {
        httpServerObject.sockets[ids[i]].destroy();
      }
    }
  });
}

function clearCache() {
  var cacheIds = Object.keys(require.cache);
  for (var i = 0; i < cacheIds.length; i++) {
    if (cacheIds[i] === serverDistPath) {
      delete require.cache[cacheIds[i]];
      return;
    }
  }
}

function initHttpServer() {
  var httpServer = require(serverDistPath).server;
  var sockets = {};

  var nextSocketId = 0;

  httpServer.on('connection', function(socket) {
    var socketId = nextSocketId++;
    sockets[socketId] = socket;

    socket.on('close', function() {
      delete sockets[socketId];
    });
  });

  return { httpServer: httpServer, sockets: sockets };
}

watchServerChanges();
