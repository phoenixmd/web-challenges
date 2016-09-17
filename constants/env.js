'use strict';

const argv = require('yargs').argv;

const Environments = require('./environments');

const ENV = argv.env || Environments.DEVELOPMENT;

module.exports = ENV;