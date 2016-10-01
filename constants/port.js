'use strict';

const argv = require('yargs').argv;

const Config = require('../modules/config');

let port;

if (argv.port) {
  port = parseInt(argv.port, 10);
} else if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = Config.get('app').port;
}

module.exports = port;