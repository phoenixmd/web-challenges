'use strict';

const argv = require('yargs').argv;

const Environments = require('./environments');

/* istanbul ignore next */
const ENV = argv.env || process.env.NODE_ENV || Environments.DEVELOPMENT;

module.exports = ENV;