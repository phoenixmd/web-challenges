'use strict';

const HTTPStatus = require('http-status');
const HTTPMocks = require('node-mocks-http');

const notFound = require('../../middlewares/404');

describe('Middlewares : 404', function () {

  it('should send back a 404', function (done) {
    const middleware = notFound();

    const req = HTTPMocks.createRequest();

    middleware(req, {}, err => {
      expect(err.statusCode).to.equal(HTTPStatus.NOT_FOUND);
      return done();
    });

  });

});