'use strict';

const HTTPStatus = require('http-status');

module.exports = () => {
  return (req, res, next) => {
    const err = new Error(`Cannot ${req.method} ${req.originalUrl}. Resource not found.`);
    err.statusCode = HTTPStatus.NOT_FOUND;
    return next(err);
  };
};