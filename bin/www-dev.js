'use strict'

var config = require('config'),
    path = require('path'),
    serverConfig = require('../webpack/server'),
    webpack = require('webpack');

// Shamelessly borrowed from http://www.reactjunkie.com/universal-hot-reload/
function watchServerChanges(serverPath) {
  var httpServerObject = null;
  var compiler = webpack(serverConfig);
  var compilerOptions = {};

  return compiler.watch(compilerOptions, function onServerChange(err, stats) {
    if (err) {
      console.log('Server bundling error: ', JSON.stringify(err));
      return;
    }

    clearCache(serverPath);

    if (httpServerObject === null) {
      httpServerObject = initHttpServer(serverPath);
    } else {
      httpServerObject.httpServer.close(function() {
        httpServerObject = initHttpServer(serverPath);
        console.log('Server restarted ' + new Date());
      });

      var ids = Object.keys(httpServerObject.sockets);
      for (var i = 0; i < ids.length; i++) {
        httpServerObject.sockets[ids[i]].destroy();
      }
    }
  });
}

function clearCache(serverPath) {
  var cacheIds = Object.keys(require.cache);
  for (var i = 0; i < cacheIds.length; i++) {
    if (cacheIds[i] === serverPath) {
      delete require.cache[cacheIds[i]];
      return;
    }
  }
}

function initHttpServer(serverPath) {
  try {
    var httpServer = require(serverPath).server;
  } catch (ex) {
    console.log('an error occurred during reload: ', ex);
    return null;
  }
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

exports = module.exports = function(serverDistPath) {
  return watchServerChanges(serverDistPath);
};
