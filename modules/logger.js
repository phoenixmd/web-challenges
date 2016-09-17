'use strict';

const Winston = require('winston');

const Config = require('./config');

const LEVEL = Config.get('app', 'loggingLevel');

const Logger = scope => {
  return new Winston.Logger({
    level: LEVEL,
    transports: [
      new (Winston.transports.Console)({
        timestamp: true,
        colorize: true,
        label: scope
      })
    ]
  });
};

module.exports = Logger;