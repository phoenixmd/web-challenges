'use strict';

const Worker = require('./classes/worker');
const Logger = require('./modules/logger')('index');

const worker = new Worker({ maxConcurrency: 2, maxRetries: 3 });

worker.on('error', err => Logger.error(err));
worker.on('loop', info => Logger.info(`Iteration took ${info.time / 1000} seconds`));

worker.run();
