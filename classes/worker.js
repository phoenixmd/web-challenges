'use strict';

const EventEmitter = require('events').EventEmitter;

class Worker extends EventEmitter {

  get maxConcurrency() {
    return this._maxConcurrency;
  }

  get maxRetries() {
    return this._maxRetries;
  }

  constructor({ maxConcurrency = 1, maxRetries = 3 }) {
    super();
    this._maxConcurrency = maxConcurrency;
    this._maxRetries = maxRetries;
  }

  run() {
    // TODO implement
    const start = Date.now();
    return Promise.resolve()
      .then(() => {
        this.emit('loop', { time: Date.now() - start });
      })
      .catch(err => {
        this.emit('error', err);
      });
  }

}


module.exports = Worker;