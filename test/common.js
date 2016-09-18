'use strict';

const Environments = require('../constants/environments');
const Chai = require('chai');
const chaiSubset = require('chai-subset');

process.env.NODE_ENV = Environments.TEST;

Chai.use(chaiSubset);
global.expect = Chai.expect;