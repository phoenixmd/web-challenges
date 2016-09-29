'use strict';

const http = require('http');

const app = require('./app');
const PORT = require('./constants/port');
const Config = require('./modules/config');
const Logger = require('./modules/logger')('server');
const Sequelize = require('sequelize');
Sequelize.tango_db_con = new Sequelize(Config.get('app').db.database, Config.get('app').db.username, Config.get('app').db.password, {
    host: Config.get('app').db.host,
    port: Config.get('app').db.port,
    logging: Logger
});
const server = http.createServer(app);
require('./db/init_schemas').then(function () {
    server.listen(PORT);
    Logger.info(`${Config.get('app').name} listening on port ${PORT}`);
});
module.exports = server;