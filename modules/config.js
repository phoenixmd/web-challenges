'use strict';

const ConfigMan = require('configman');

const ENV = require('../constants/env');

const Config = new ConfigMan({ env: ENV });

module.exports = Config;