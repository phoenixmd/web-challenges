'use strict';

const HTTPMocks = require('node-mocks-http');
const HTTPStatus = require('http-status');

const errorHandler = require('../../middlewares/error-handler');

describe('Middlewares : error-handler', function () {

  it('should set statusCode, message, code and trace', function () {
    const middleware = errorHandler({ showStackTrace: true });

    const err = new Error('Test');
    Object.assign(err, {
      statusCode: HTTPStatus.BAD_REQUEST,
      code: 'BadRequestError'
    });

    const res = HTTPMocks.createResponse();

    middleware(err, {}, res);

    expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);

    const body = JSON.parse(res._getData());

    expect(body).to.containSubset({
      error: true,
      code: 'BadRequestError',
      message: 'Test'
    });
    expect(body).to.contain.keys(['trace']);
  });

  it('should default to InternalServerError', function () {
    const middleware = errorHandler({});

    const err = new Error('Test');
    const res = HTTPMocks.createResponse();

    middleware(err, {}, res);

    expect(res.statusCode).to.equal(HTTPStatus.INTERNAL_SERVER_ERROR);
  });

  it('should not leak err message', function () {
    const middleware = errorHandler({});

    const err = new Error('Test');
    const res = HTTPMocks.createResponse();

    middleware(err, {}, res);

    expect(JSON.parse(res._getData()).message).to.match(/wrong/);
  });

  it('should return real error message', function () {
    const middleware = errorHandler({});

    const err = new Error('Test');
    Object.assign(err, { statusCode: HTTPStatus.BAD_REQUEST });
    const res = HTTPMocks.createResponse();

    middleware(err, {}, res);

    expect(JSON.parse(res._getData()).message).to.equal('Test');
  });

});