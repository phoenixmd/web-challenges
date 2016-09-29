'use strict';

const http = require('http');


const PORT = require('./constants/port');
const Config = require('./modules/config');
const Logger = require('./modules/logger')('server');
const Sequelize = require('sequelize');


const app = require('./app');
app.init()
    .then(()=> {
        const server = http.createServer(app);

        server.listen(PORT);

        Logger.info(`${Config.get('app').name} listening on port ${PORT}`);
        module.exports = server;
    });
