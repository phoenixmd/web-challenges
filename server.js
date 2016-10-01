'use strict';

const http = require('http');

const app = require('./app');
const PORT = require('./constants/port');
const Config = require('./modules/config');
const Logger = require('./modules/logger')('server');
const models = require("./models");

const server = http.createServer(app);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
    server.listen(PORT);
    server.on('error', onError);
    server.on('listening', onListening);
});

function onError(error) {  }
function onListening() {  }

server.listen(PORT);

Logger.info(`${Config.get('app').name} listening on port ${PORT}`);

module.exports = server;