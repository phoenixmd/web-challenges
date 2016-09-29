'use strict';

const HTTPStatus = require('http-status');

const Logger = require('../modules/logger')('error-handler');

module.exports = ({ showStackTrace = false }) => {
  return (err, req, res, next) => {
    console.log(err.statusCode);
    const statusCode = err.status || err.statusCode || HTTPStatus.INTERNAL_SERVER_ERROR;
    const trace = showStackTrace && err.stack ? err.stack : undefined;
    
    statusCode === HTTPStatus.INTERNAL_SERVER_ERROR ? Logger.error(err.stack) : Logger.warn(err.message);

    const message = showStackTrace ?
      err.message :
      statusCode === HTTPStatus.INTERNAL_SERVER_ERROR ?
        'Something went wrong. Please try again later.' : // Hide server errors in production
        err.message;

    return res.status(statusCode).json({
      error: true,
      message: message,
      trace,
      code: err.code,
      meta: err.meta
    });
  };
};