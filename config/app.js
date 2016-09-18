'use strict';

module.exports = {
  default: {
    name: 'Tango authentication challenge server',
    port: 8888,
    loggingLevel: 'verbose',
    showStackTrace: true
  },
  test: {
    port: 9888,
    loggingLevel: 'off'
  },
  production: {
    showStackTrace: false
  }
};