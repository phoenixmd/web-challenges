'use strict';

module.exports = {
    default: {
        name: 'Tango authentication challenge server',
        port: 8888,
        loggingLevel: 'verbose',
        showStackTrace: true,
        db: {
            database: 'purifier',
            username: 'dev',
            password: 'dev123',
            host: 'localhost',
            port: '3306'
        }
    },
    test: {
        port: 9888,
        loggingLevel: 'off'
    },
    production: {
        showStackTrace: false
    }
};