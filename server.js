'use strict';

const http = require('http');

const app = require('./app');
const PORT = require('./constants/port');
const Config = require('./modules/config');
const Logger = require('./modules/logger')('server');


const server = http.createServer(app);

server.listen(PORT);

Logger.info(`${Config.get('app').name} listening on port ${PORT}`);

module.exports = server;